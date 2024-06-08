"use client";
import { MESSAGES, MESSAGE_QDATA } from "@/app/Types/types";
import MessageService from "@/app/endpoints/messages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import { Button } from "./ui/button";

type Props = {};

const EmailWrapper = (props: Props) => {
  const { data: session } = useSession();
  const [qData, setQData] = useState<MESSAGE_QDATA>({
    maxResults: 10,
    includeSpamTrash: true,
  });
  // Logic to fetch all user inbox :
  const fetchUserInboxMails = () => {
    MessageService.fetchMessages(qData)
      .then((res: any) => {
        console.log("GMAIL USER MESSAGE: ", res.data.messages);
        fetchMessageDetail(res.data.messages);
      })
      .catch((error: any) => {
        console.log("FAILED TO FETCH INBOX INFO: ", error);
      });
  };

  const fetchMessageDetail = (messages: MESSAGES[]) => {
    for (const message of messages) {
      MessageService.fetchMessageDetail(message.id)
        .then((res) => {
          console.log(message.id, "->", res.data);
        })
        .catch((err: any) => {
          console.log("FAILED TO FETCH MESSAGE DETAILS: ", err);
        });
    }
  };
  useEffect(() => {
    fetchUserInboxMails();
  }, []);

  return (
    <div className="mt-20">
      <div className="flex justify-between items-center">
        <Select
          onValueChange={(e) => {
            setQData({ ...qData, maxResults: Number(e) });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={20}>20</SelectItem>
            <SelectItem value={30}>30</SelectItem>
          </SelectContent>
        </Select>

        <Button variant={"outline"} className="border-dashed border-rose-500">
          Classify
        </Button>
      </div>

      {/* Email List  */}
      <div className="flex flex-col gap-y-8 mt-12">
        {Array.from({ length: 20 }).map((x: any) => (
          <EmailCard key={x} />
        ))}
      </div>
    </div>
  );
};

export default EmailWrapper;
