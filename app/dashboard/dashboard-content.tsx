"use client";

import { useContactViews } from "@/hooks/use-contact-views";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBuildingSkyscraper,
  IconUsers,
  IconEye,
  IconTrendingUp,
} from "@tabler/icons-react";

interface DashboardContentProps {
  userId: string;
  totalAgencies: number;
  totalContacts: number;
}

export function DashboardContent({
  userId,
  totalAgencies,
  totalContacts,
}: DashboardContentProps) {
  const { remaining, viewCount, dailyLimit } = useContactViews(userId);

  const stats = [
    {
      title: "Total Agencies",
      value: totalAgencies.toLocaleString(),
      description: "Cities and counties in database",
      icon: IconBuildingSkyscraper,
    },
    {
      title: "Total Contacts",
      value: totalContacts.toLocaleString(),
      description: "Employee records available",
      icon: IconUsers,
    },
    {
      title: "Views Today",
      value: `${viewCount} / ${dailyLimit}`,
      description: `${remaining} views remaining`,
      icon: IconEye,
    },
    {
      title: "View Limit",
      value: `${dailyLimit}`,
      description: "Contacts per day (free plan)",
      icon: IconTrendingUp,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Agency Dashboard. View agencies and contacts data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/dashboard/agencies"
              className="block rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <IconBuildingSkyscraper className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">View All Agencies</p>
                  <p className="text-sm text-muted-foreground">
                    Browse {totalAgencies} agencies
                  </p>
                </div>
              </div>
            </a>
            <a
              href="/dashboard/contacts"
              className="block rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <IconUsers className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">View All Contacts</p>
                  <p className="text-sm text-muted-foreground">
                    Browse {totalContacts} contacts ({remaining} views left
                    today)
                  </p>
                </div>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Views used</span>
                  <span className="font-medium">
                    {viewCount} / {dailyLimit}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(
                        (viewCount / dailyLimit) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your daily limit resets at midnight UTC. Upgrade to Pro for
                unlimited contact views.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
