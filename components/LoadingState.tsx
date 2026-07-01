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
    <Card className="border-blue-100 bg-blue-50/60 shadow-[0_0_32px_-12px_rgba(59,130,246,0.12)]">
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="relative flex size-16 shrink-0 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping"
            aria-hidden
          />
          <div className="relative flex size-14 items-center justify-center rounded-full border border-blue-200 bg-white">
            <Hourglass
              className="size-8 text-blue-500 animate-[hourglass-wiggle_1.2s_ease-in-out_infinite]"
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
          <p className="text-xs text-blue-500">Usually under a minute — thanks for waiting!</p>
        </div>
      </CardContent>
    </Card>
  );
}
