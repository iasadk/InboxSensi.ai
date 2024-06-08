import { type ClassValue, clsx } from "clsx";
import { getSession, useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getToken() {
  const session = await getSession();
  // if(!session?.) return;
  return session?.access_token;
}
