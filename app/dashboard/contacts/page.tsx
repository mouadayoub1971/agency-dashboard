import { auth } from "@clerk/nextjs/server";
import { getContacts } from "@/lib/data";
import { ContactsTable } from "./contacts-table";

export default async function ContactsPage() {
  const { userId } = await auth();
  const contacts = getContacts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Browse employee contacts. You can view up to 50 contacts per day on
          the free plan.
        </p>
      </div>

      <ContactsTable contacts={contacts} userId={userId || ""} />
    </div>
  );
}
