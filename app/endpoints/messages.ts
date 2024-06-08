import GmailApiInstance from "@/lib/GmailApiInstance";
import { MESSAGE_QDATA } from "../Types/types";

class MessageService {
  static fetchMessages(qData: MESSAGE_QDATA) {
    return GmailApiInstance.get("/messages", { params: { ...qData } });
  }
  static fetchMessageDetail(messageId: string) {
    return GmailApiInstance.get("/messages/" + messageId);
  }
}

export default MessageService;
