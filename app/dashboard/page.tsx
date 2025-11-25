import { auth } from "@clerk/nextjs/server";
import { getAgencies, getContacts } from "@/lib/data";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const { userId } = await auth();
  const agencies = getAgencies();
  const contacts = getContacts();

  return (
    <DashboardContent
      userId={userId || ""}
      totalAgencies={agencies.length}
      totalContacts={contacts.length}
    />
  );
}
