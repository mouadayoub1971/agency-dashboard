import { getAgencies } from "@/lib/data";
import { AgenciesTable } from "./agencies-table";

export default function AgenciesPage() {
  const agencies = getAgencies();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Agencies</h1>
        <p className="text-muted-foreground">
          Browse all {agencies.length} agencies in the database.
        </p>
      </div>

      <AgenciesTable agencies={agencies} />
    </div>
  );
}
