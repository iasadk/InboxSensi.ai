import Dashboard from "@/components/Dashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  console.log("DATA:", session);
  // console.log("ACCESS_TOKEN:",await getAccessToken());
  // if(!da)
  return <Dashboard user={session.user}/>;
};

export default Page;
