import Dashboard from "@/components/Dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // if (!user) redirect("/auth-callback?origin=dashboard");
  console.log("DATA:",user)
  return <Dashboard/>;
};

export default Page;
