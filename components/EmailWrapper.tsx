"use client";
import {
  MESSAGE,
  MESSAGES,
  MESSAGE_META,
  MESSAGE_QDATA,
} from "@/app/Types/types";
import MessageService from "@/app/endpoints/messages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import EmailCard from "./EmailCard";
import { Button } from "./ui/button";
import EmailCardSkeleton from "./EmailCardSkeleton";
import EmailsAPIError from "./EmailsAPIError";
import { classifyEmails } from "@/lib/generativeAI";
import { LoaderCircle } from "lucide-react";
import {
  cn,
  handleExistingInboxList,
  loadLocallyClassifedMsgs,
  mergeLocallyClassifiedAndNewUnclassifiedMsgs,
} from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useToast } from "./ui/use-toast";

type Props = {};

const EmailWrapper = (props: Props) => {
  const [qData, setQData] = useState<MESSAGE_QDATA>({
    maxResults: 15,
    includeSpamTrash: true,
  });
  const [ajxMessages, setAjxMessages] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [inboxList, setInboxList] = useState<MESSAGE[]>([]);
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const scrollRef = useRef(null);
  const { toast } = useToast();
  // Logic to fetch all user inbox :
  const fetchUserInboxMails = () => {
    setAjxMessages(true);
    setShowError(false);
    MessageService.fetchMessages(qData)
      .then((res: any) => {

        const JsonClassfiedMsgs = loadLocallyClassifedMsgs();
        const existingClassifiedMessageIds = JsonClassfiedMsgs.filter(
          (x: any) => x.category
        ).map((x: any) => x.id);
        // Only fetching those message details for which we don't have any classified data in local storage.
        const newMessageIdWhichWeDontHave = res.data.messages.filter(
          (msg: any) => !existingClassifiedMessageIds.includes(msg.id)
        );
        
        if (!inboxList.length) {
          processMessages(newMessageIdWhichWeDontHave);
        } else {
          processMessages(newMessageIdWhichWeDontHave);
        }
      })
      .catch((error: any) => {
        setAjxMessages(false);
        setShowError(true);
        if (error.response.status === 401) {
          toast({
            title: "Session Expired !!",
            description: "Please login again.",
          });
          signOut();
        }
        console.log(
          "FAILED TO FETCH INBOX INFO: ",
          error.response.data?.error?.message
        );
        // if(error.message)
      });
  };

  const fetchMessageDetails = async (messageId: string): Promise<MESSAGE> => {
    try {
      const res = await MessageService.fetchMessageDetail(messageId);
      // Filtering Meta data of user each email:
      const metaData = res.data.payload.headers.filter(
        (x: { name: string }) =>
          x.name === "Date" || x.name === "From" || x.name === "To"
      );

      const emailParts = res.data.payload?.parts;
      // Extract email details
      const subjectObj = res.data.payload.headers?.find(
        (header: MESSAGE_META) => header.name === "Subject"
      );
      const subject = subjectObj ? subjectObj.value : "No Subject";

      let body = "";

      const part = emailParts?.find(
        (part: { mimeType: string }) =>
          part.mimeType === "text/plain" || part.mimeType === "text/html"
      );
      // console.log(messageId, part);
      if (part && part.body && part.body.data) {
        const bodyData = part.body.data;
        body = Buffer.from(bodyData, "base64").toString("utf-8");
      } else if (res.data.payload.body && res.data.payload.body.data) {
        // sometimes we don't have and text/plain && text/html part in fetched email payload
        const bodyData = res.data.payload.body.data;
        body = Buffer.from(bodyData, "base64").toString("utf-8");
      }
      return {
        id: res.data.id,
        threadId: res.data.threadId,
        snippet: res.data.snippet,
        labelIds: res.data.labelIds,
        body,
        subject,
        metaData,
      };
    } catch (err) {
      setAjxMessages(false);
      setShowError(true);
      console.log("FAILED TO FETCH MESSAGE DETAILS: ", err);
      throw err;
    }
  };

  const processMessages = async (
    messages: MESSAGES[]) => {
    try {
      const messagePromise = messages.map((message) =>
        fetchMessageDetails(message.id)
      );
      const msgs: MESSAGE[] = await Promise.all(messagePromise);
      const locallyClassifiedMsg = loadLocallyClassifedMsgs();
      const mergedData = mergeLocallyClassifiedAndNewUnclassifiedMsgs(
        locallyClassifiedMsg,
        msgs,
        qData.maxResults
      );
      setInboxList(mergedData)
    } catch (err) {
      setShowError(true);
      console.error("Error processing messages", err);
    }
    setAjxMessages(false);
  };

  const classifyMyEmails = async () => {
    setIsClassifying(true);
    const data = await classifyEmails(inboxList);
    setIsClassifying(false);

    localStorage.setItem("classified_msgs", JSON.stringify(data));
    setInboxList(data);
  };
  useEffect(() => {
    if (scrollRef) {
      if (qData.maxResults > inboxList.length) {
        // only scroll to bottom once user fetches more than 15 rows
        // @ts-ignore
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (qData.maxResults < inboxList.length) {
      // then we don't need to call API again for existing result
      setInboxList(handleExistingInboxList(qData.maxResults, inboxList));
    } else {
      fetchUserInboxMails();
    }
  }, [qData]);

  return (
    <div className="mt-20">
      <div className="flex justify-between items-center">
        <Select
          onValueChange={(e) => {
            setQData({ ...qData, maxResults: Number(e) });
            window.scrollTo({ behavior: "smooth", top: -200 });
          }}
          value={qData.maxResults}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="15" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={15}>15</SelectItem>
            <SelectItem value={30}>30</SelectItem>
            <SelectItem value={45}>45</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={"outline"}
          className="border-dashed border-rose-500 transition-transform"
          disabled={showError || ajxMessages}
          onClick={classifyMyEmails}
        >
          Classify
          <LoaderCircle
            className={cn("animate-spin text-rose-500 ml-4", {
              hidden: !isClassifying,
            })}
          />
        </Button>
      </div>

      {/* Email List  */}
      {inboxList.length > 0 && (
        <div className="flex flex-col gap-y-8 mt-12">
          {inboxList.map((x: MESSAGE, idx: number) => {
            if (inboxList.length - 1 === idx) {
              return (
                <EmailCard key={x.id} message={x} ref={scrollRef} />
              );
            } else {
              return <EmailCard key={x.id} message={x} />;
            }
          })}
        </div>
      )}
      {ajxMessages && !showError && (
        <div className="flex flex-col gap-y-8 mt-12">
          {Array.from({ length: 10 }).map((x: any) => (
            <EmailCardSkeleton key={x} />
          ))}
        </div>
      )}
      {!ajxMessages && showError && (
        <EmailsAPIError retryFn={fetchUserInboxMails} />
      )}
    </div>
  );
};

export default EmailWrapper;
