const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)

export async function test(key: string) {
  try {
    const genAI = new GoogleGenerativeAI(key);
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log(model);
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
    // if(response.error){
    //     return{
    //         message: error.message
    //     }
    // }
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}
