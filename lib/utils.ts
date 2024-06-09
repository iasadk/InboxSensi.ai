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

export function prettifyEmailList(
  orgList: MESSAGE[],
  classifiedData: classifiedData[]
) {
  let classifiedEmails: MESSAGE[] = [];
  for (const email of orgList) {
    const classifiedInfo = !email.category
      ? classifiedData.find((data) => data.id === email.id)
      : email;

    classifiedEmails.push({
      ...email,
      category: classifiedInfo?.category,
    });
  }

  return classifiedEmails;
}

export function handleExistingInboxList(limit: number, inboxList: MESSAGE[]) {
  return inboxList.slice(0, limit);
}
// Made this two function below in-order to optimize generativeAI and Gmail API calls
export function loadLocallyClassifedMsgs() {
  const locallyStoredClassifiedMsgs =
    window.localStorage.getItem("classified_msgs");
  const JsonClassfiedMsgs = locallyStoredClassifiedMsgs
    ? JSON.parse(locallyStoredClassifiedMsgs)
    : [];
  return JsonClassfiedMsgs;
}

// This will make sure all new messages will come first after fetching data from Gmail API for only new messages which we don't have
export function mergeLocallyClassifiedAndNewUnclassifiedMsgs(
  localMsg: MESSAGE[],
  newMsgs: MESSAGE[],
  limit: number
) {
  const sortedArr = newMsgs.concat(localMsg).sort((a, b) => {
    // @ts-ignore
    const dateA = new Date(a.metaData.find((x) => x.name === "Date")?.value);
    // @ts-ignore
    const dateB = new Date(b.metaData.find((x) => x.name === "Date")?.value);

    // Handle undefined dates
    // @ts-ignore
    if (isNaN(dateA)) return 1;
    // @ts-ignore
    if (isNaN(dateB)) return -1;
    // @ts-ignore
    return dateB - dateA;
  });
  console.log(sortedArr);
  return sortedArr.slice(0,limit)
}
