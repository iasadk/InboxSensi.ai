export interface USER_TYPE {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}


export interface MESSAGE_QDATA{
  maxResults: number;
  includeSpamTrash?: boolean
}


export interface MESSAGES{
  id:string,
  threadId:string
}

export interface MESSAGE_META{
  name: string,
  value: string
}

export interface MESSAGE{
  id: string
  threadId: string
  snippet: string
  body: string
  subject: string
  labelIds: string[]
  metaData: MESSAGE_META[]
  category?: string
}

export interface classifiedData{
  subject: string,
  id: string
  category: string
}