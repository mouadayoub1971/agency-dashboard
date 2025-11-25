import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IconBuildingSkyscraper, IconUsers, IconLock } from "@tabler/icons-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <IconBuildingSkyscraper className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Agency Dashboard
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Access comprehensive data on agencies and contacts. View detailed
            information about cities, counties, and their employees.
          </p>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <IconBuildingSkyscraper className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold">921 Agencies</h3>
              <p className="text-sm text-muted-foreground">Cities & Counties</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <IconUsers className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold">999 Contacts</h3>
              <p className="text-sm text-muted-foreground">Employee Records</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <IconLock className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold">Secure Access</h3>
              <p className="text-sm text-muted-foreground">Authentication Required</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-md border bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
