export interface USER_TYPE {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}


export interface MESSAGE_QDATA{
  maxResults?: number;
  includeSpamTrash?: boolean
}


export interface MESSAGES{
  id:string,
  threadId:string
}