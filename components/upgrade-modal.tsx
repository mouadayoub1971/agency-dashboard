"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconRocket, IconCheck } from "@tabler/icons-react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <IconRocket className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">
            Daily Limit Reached
          </DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve viewed 50 contacts today. Upgrade to Pro for unlimited
            access to all contact information.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 rounded-lg border bg-muted/50 p-4">
          <h4 className="mb-3 font-semibold">Pro Plan Benefits</h4>
          <ul className="space-y-2">
            {[
              "Unlimited contact views",
              "Export contacts to CSV",
              "Advanced search filters",
              "Priority support",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm">
                <IconCheck className="h-4 w-4 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full" onClick={onClose}>
            Upgrade to Pro - $29/month
          </Button>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
