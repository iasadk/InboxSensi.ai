'use client'
import React, { forwardRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MESSAGE } from "@/app/Types/types";
import EmailDetail from "./EmailDetail";
// @ts-ignore
import DOMPurify from "dompurify"

type Props = {
  message: MESSAGE;
};

const EmailCard = forwardRef<HTMLDivElement, Props>(({ message }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const cleanHtml = DOMPurify.sanitize(message.snippet);

  return (
    <div className="border  rounded-md py-3 px-4 cursor-pointer hover:shadow-md transition-shadow" ref={ref} onClick={()=>{
      setOpen(true)
    }}>
      <div className="text-xl font-medium flex justify-between items-center">
        <div className="flex flex-col">
          <span className="inline-block">
            {
              message.metaData
                .find((meta) => meta.name === "From")
                ?.value.split(" ")[0]
            }
          </span>
          <span className="inline-block text-gray-400 text-[.65rem]">
            {message.metaData
                .find((meta) => meta.name === "Date")
                ?.value.split("+")[0]}
          </span>
        </div>
        {message.category === "Important" && <Badge variant="outline" className="bg-red-500 text-white">Important</Badge>}
        {message.category === "Promotions" && <Badge variant="outline" className="bg-blue-500 text-white">Promotional</Badge>}
        {message.category === "Marketing" && <Badge variant="outline" className="bg-violet-500 text-white">Marketing</Badge>}
        {message.category === "Social" && <Badge variant="outline" className="bg-lime-500 text-white">Social</Badge>}
        {message.category === "Spam" && <Badge variant="outline" className="bg-yellow-500 text-white">Spam</Badge>}
        {message.category === "General" && <Badge variant="outline" className="bg-fuchsia-500 text-white">
          General
        </Badge>}
      </div>
      <div className="mt-3">
        <span className="line-clamp-2 leading-[1.8rem]" dangerouslySetInnerHTML={{
          __html:cleanHtml
        }}/>
      </div>
        <EmailDetail setOpen={setOpen} open={open} message={message}/>
    </div>
  );
});

export default EmailCard;
