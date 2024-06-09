import { MESSAGE } from "@/app/Types/types";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { prettifyEmailList } from "./utils";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export async function test(key: string) {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const prompt = "Hi";

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: "Invalid API key",
      };
    }
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}

export const classifyEmails = async (emails: MESSAGE[]) => {
  if (emails.length) {
    const USER_GEMINI_TOKEN =
      window.localStorage.getItem("gemini_key") ||
      process.env.NEXT_PUBLIC_GEMINI_KEY ||
      "";

    const genAI = new GoogleGenerativeAI(USER_GEMINI_TOKEN);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const size = 45;
    let cleanedData: MESSAGE[] = [];
    for (let i = 0; i < emails.length; i += size) {
      const emailList = emails.slice(i, i + size);
      try {
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
        });

        const JSONData = emailList
          .filter((x) => !x.category)
          .map((email) => ({ subject: email.subject, id: email.id }));
          // console.log(JSONData)
          // If No new Data is there then why even bother to classify it using Gemini
        if (JSONData.length) {
          const prompt = `Hi Gemini categories these emails on the basis of these points:
         - Important: Emails that are personal or work-related and require immediate attention.
         - Promotions: Emails related to sales, discounts, and marketing campaigns.
         - Social: Emails from social networks, friends, and family.
         - Marketing: Emails related to marketing, newsletters, and notifications.
         - Spam: Unwanted or unsolicited emails.
         - General: If none of the above are matched, use General

         I'm giving you JSON object with this format:
         {
          subject:"SOME SUBJECT",
          id:'uniqueId'
         }

         here is the data: ${JSON.stringify(JSONData)}

         Give me result strictly in this format only no other text is required: 
         {
          subject:"",
          id: "SAME AS GIVEN",
          category: "CATEGORY SPECIFIED ABOVE"
         }

         `;

          const result = await chatSession.sendMessage(prompt);
          const classifications = result.response;

          const aiResponse = classifications.text();
          cleanedData = prettifyEmailList(emailList, JSON.parse(aiResponse));
        }else{
          return emails;
        }
      } catch (error: any) {
        console.error("Error:", error.message);
        // Log error or handle it as needed
      }
    }
    return cleanedData;
  }
  return emails;
};
