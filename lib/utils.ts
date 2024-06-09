import { MESSAGE, MESSAGES, classifiedData } from "@/app/Types/types";
import { type ClassValue, clsx } from "clsx";
import { getSession, useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getToken() {
  const session = await getSession();
  // if(!session?.) return;
  // @ts-ignore
  return session?.access_token;
}



export function prettifyEmailList(orgList : MESSAGE[], classifiedData: classifiedData[]){
  let classifiedEmails: MESSAGE[] = []
  for (const email of orgList) {
    const classifiedInfo = !email.category ?  classifiedData.find(data => data.id === email.id) : email;

    classifiedEmails.push({
      ...email,
      category: classifiedInfo?.category
    })
  }

  return classifiedEmails;
}