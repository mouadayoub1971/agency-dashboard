"use client";

import { useState, useMemo } from "react";
import { Contact } from "@/lib/types";
import { useContactViews } from "@/hooks/use-contact-views";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpgradeModal } from "@/components/upgrade-modal";
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconEyeOff,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

interface ContactsTableProps {
  contacts: Contact[];
  userId: string;
}

const ITEMS_PER_PAGE = 20;

export function ContactsTable({ contacts, userId }: ContactsTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { remaining, viewCount, dailyLimit, recordView, isViewed, limitReached } =
    useContactViews(userId);

  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;

    const searchLower = search.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.first_name.toLowerCase().includes(searchLower) ||
        contact.last_name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.title?.toLowerCase().includes(searchLower) ||
        contact.department?.toLowerCase().includes(searchLower)
    );
  }, [contacts, search]);

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedContacts = filteredContacts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleViewContact = (contactId: string) => {
    if (isViewed(contactId)) return true;

    const success = recordView(contactId);
    if (!success) {
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    if (!domain) return "***@***.***";
    return `${local.slice(0, 2)}***@${domain.slice(0, 3)}***`;
  };

  const maskPhone = (phone: string) => {
    if (!phone) return "-";
    return phone.replace(/\d(?=\d{4})/g, "*");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={limitReached ? "destructive" : "secondary"}>
            <IconEye className="mr-1 h-3 w-3" />
            {viewCount} / {dailyLimit} views today
          </Badge>
          <p className="text-sm text-muted-foreground">
            {remaining} remaining
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedContacts.map((contact) => {
                const viewed = isViewed(contact.id);
                const canView = viewed || !limitReached;

                return (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      {contact.first_name} {contact.last_name}
                    </TableCell>
                    <TableCell>{contact.title || "-"}</TableCell>
                    <TableCell>
                      {contact.department ? (
                        <Badge variant="outline">{contact.department}</Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {viewed ? (
                        <a
                          href={`mailto:${contact.email}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <IconMail className="h-3 w-3" />
                          {contact.email}
                        </a>
                      ) : canView ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => handleViewContact(contact.id)}
                        >
                          <IconEyeOff className="mr-1 h-3 w-3" />
                          {maskEmail(contact.email)}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">
                          {maskEmail(contact.email)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {viewed ? (
                        contact.phone ? (
                          <a
                            href={`tel:${contact.phone}`}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            <IconPhone className="h-3 w-3" />
                            {contact.phone}
                          </a>
                        ) : (
                          "-"
                        )
                      ) : canView ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => handleViewContact(contact.id)}
                        >
                          <IconEyeOff className="mr-1 h-3 w-3" />
                          {maskPhone(contact.phone)}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">
                          {maskPhone(contact.phone)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {viewed ? (
                        <Badge variant="default" className="bg-green-500">
                          <IconEye className="mr-1 h-3 w-3" />
                          Viewed
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <IconEyeOff className="mr-1 h-3 w-3" />
                          Hidden
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <IconChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <IconChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
}
