'use client'
import { USER_TYPE } from "@/app/Types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Container } from "./Container";
import EmailWrapper from "./EmailWrapper";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type Props = {
  user: USER_TYPE | undefined;
};

const Dashboard = ({ user }: Props) => {
  return (
    <Container className="border-2 border-green-500 p-24">
      <div className="flex gap-x-4 items-center justify-between">
        {/* User Detail part */}
        <div className="flex gap-x-4 items-center">
          <Avatar>
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="inline-block">{user?.name}</span>
            <span className="inline-block text-[0.75rem]">{user?.email}</span>
          </div>
        </div>
        {/* Logout Button */}
        <div>
            <Button
              className={"bg-rose-600"}
              variant={"destructive"}
              onClick={()=>{
                signOut();
              }}
            >
              Logout
            </Button>
        </div>
      </div>
      <Separator className="my-4" />
      {/* Email Lisitng */}
      <EmailWrapper/>
    </Container>
  );
};

export default Dashboard;
