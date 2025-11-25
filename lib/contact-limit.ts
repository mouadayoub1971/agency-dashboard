const DAILY_LIMIT = 50;

export function getStorageKey(userId: string): string {
  const today = new Date().toISOString().split("T")[0];
  return `contact_views_${userId}_${today}`;
}

export function getViewedContacts(userId: string): string[] {
  if (typeof window === "undefined") return [];
  const key = getStorageKey(userId);
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export function addViewedContact(userId: string, contactId: string): boolean {
  if (typeof window === "undefined") return false;

  const viewed = getViewedContacts(userId);

  // Already viewed, don't count again
  if (viewed.includes(contactId)) {
    return true;
  }

  // Check if limit reached
  if (viewed.length >= DAILY_LIMIT) {
    return false;
  }

  // Add to viewed
  viewed.push(contactId);
  localStorage.setItem(getStorageKey(userId), JSON.stringify(viewed));
  return true;
}

export function getRemainingViews(userId: string): number {
  const viewed = getViewedContacts(userId);
  return Math.max(0, DAILY_LIMIT - viewed.length);
}

export function hasReachedLimit(userId: string): boolean {
  return getRemainingViews(userId) <= 0;
}

export function getViewCount(userId: string): number {
  return getViewedContacts(userId).length;
}

export const CONTACT_DAILY_LIMIT = DAILY_LIMIT;
