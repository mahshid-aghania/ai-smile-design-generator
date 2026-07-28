"use client";

import { useEffect, useState } from "react";
import { Hourglass } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const WAIT_MESSAGES = [
  "Polishing pixels on your canines…",
  "Asking your molars for a second opinion…",
  "Flossing the neural network…",
  "Whitening the digital enamel…",
  "Almost there—great smiles take a moment!",
  "Counting teeth (twice, just to be sure)…",
  "Your future smile is loading…",
];

type LoadingStateProps = {
  active: boolean;
};

export function LoadingState({ active }: LoadingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % WAIT_MESSAGES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <Card
      aria-live="polite"
      className="border-[var(--border)] bg-[var(--primary-soft)]/60 shadow-none"
    >
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="relative flex size-16 shrink-0 items-center justify-center">
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[var(--primary)]/15"
            aria-hidden
          />
          <div className="relative flex size-14 items-center justify-center rounded-full border border-[var(--primary)]/25 bg-[var(--surface)]">
            <Hourglass
              className="size-8 animate-[hourglass-wiggle_1.2s_ease-in-out_infinite] text-[var(--primary)]"
              aria-hidden
            />
          </div>
        </div>
        <div className="space-y-1.5 min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Crafting your AI smile preview…
          </p>
          <p key={messageIndex} className="text-sm text-[var(--foreground-muted)]">
            {WAIT_MESSAGES[messageIndex]}
          </p>
          <p className="text-xs font-medium text-[var(--primary)]">
            Usually under a minute — thanks for waiting!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
