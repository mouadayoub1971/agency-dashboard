import type { Agency, Contact } from "./types";
import agenciesData from "@/public/data/agencies.json";
import contactsData from "@/public/data/contacts.json";

export function getAgencies(): Agency[] {
  return agenciesData as Agency[];
}

export function getContacts(): Contact[] {
  return contactsData as Contact[];
}

export function getAgencyById(id: string): Agency | undefined {
  return getAgencies().find((agency) => agency.id === id);
}

export function getContactsByAgencyId(agencyId: string): Contact[] {
  return getContacts().filter((contact) => contact.agency_id === agencyId);
}
