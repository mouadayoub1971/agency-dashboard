"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getViewedContacts,
  addViewedContact,
  getRemainingViews,
  hasReachedLimit,
  getViewCount,
  CONTACT_DAILY_LIMIT,
} from "@/lib/contact-limit";

export function useContactViews(userId: string | null) {
  const [viewedContacts, setViewedContacts] = useState<string[]>([]);
  const [remaining, setRemaining] = useState(CONTACT_DAILY_LIMIT);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setViewedContacts(getViewedContacts(userId));
    setRemaining(getRemainingViews(userId));
    setLimitReached(hasReachedLimit(userId));
  }, [userId]);

  const recordView = useCallback(
    (contactId: string): boolean => {
      if (!userId) return false;

      const success = addViewedContact(userId, contactId);

      if (success) {
        setViewedContacts(getViewedContacts(userId));
        setRemaining(getRemainingViews(userId));
        setLimitReached(hasReachedLimit(userId));
      }

      return success;
    },
    [userId]
  );

  const isViewed = useCallback(
    (contactId: string): boolean => {
      return viewedContacts.includes(contactId);
    },
    [viewedContacts]
  );

  return {
    viewedContacts,
    remaining,
    limitReached,
    viewCount: viewedContacts.length,
    dailyLimit: CONTACT_DAILY_LIMIT,
    recordView,
    isViewed,
  };
}
