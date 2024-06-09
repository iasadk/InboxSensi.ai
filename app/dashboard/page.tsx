import Dashboard from "@/components/Dashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <Dashboard user={session.user}/>;
};

export default Page;
