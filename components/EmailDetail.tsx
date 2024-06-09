import { MESSAGE } from "@/app/Types/types";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
// @ts-ignore
import DOMPurify from "dompurify";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: MESSAGE;
};

const EmailDetail = ({ open, setOpen, message }: Props) => {
  const cleanHtml = DOMPurify.sanitize(message.body);
  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <SheetContent className="xl:w-[700px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex flex-col">
            <span className="flex items-start gap-x-1">
              <span className="inline-block">
                {
                  message.metaData
                    .find((meta) => meta.name === "From")
                    ?.value.split("<")[0]
                }
              </span>
              <span className="inline-block text-[.75rem] text-[#818080] font-normal">
                {"<" +
                  message.metaData
                    .find((meta) => meta.name === "From")
                    ?.value.split("<")[1]}
              </span>
              <div className="ml-8">
                {message.category === "Important" && (
                  <Badge variant="outline" className="bg-red-500 text-white">
                    Important
                  </Badge>
                )}
                {message.category === "Promotions" && (
                  <Badge variant="outline" className="bg-blue-500 text-white">
                    Promotional
                  </Badge>
                )}
                {message.category === "Marketing" && (
                  <Badge variant="outline" className="bg-violet-500 text-white">
                    Marketing
                  </Badge>
                )}
                {message.category === "Social" && (
                  <Badge variant="outline" className="bg-lime-500 text-white">
                    Social
                  </Badge>
                )}
                {message.category === "Spam" && (
                  <Badge variant="outline" className="bg-yellow-500 text-white">
                    Spam
                  </Badge>
                )}
                {message.category === "General" && (
                  <Badge
                    variant="outline"
                    className="bg-fuchsia-500 text-white"
                  >
                    General
                  </Badge>
                )}
              </div>
            </span>
            <span className="inline-block text-gray-400 text-[.75rem]">
              {
                message.metaData
                  .find((meta) => meta.name === "Date")
                  ?.value.split("+")[0]
              }
            </span>
          </SheetTitle>
          <SheetDescription className="text-lg text-black font-medium">
            Subject: {message.subject}
          </SheetDescription>
          <Separator />
        </SheetHeader>

        <ScrollArea className="h-full w-full rounded-md">
        <div
            className="pr-2 mt-6 overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: cleanHtml || "No body Found",
            }}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default EmailDetail;
