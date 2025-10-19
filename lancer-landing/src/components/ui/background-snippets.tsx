"use client";

import { cn } from "@/lib/utils";

interface BackgroundSnippetsProps {
  className?: string;
}

export const BackgroundSnippets = ({ className }: BackgroundSnippetsProps) => {
  return (
    <div className="absolute top-0 -z-10 h-full w-full">
      <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[800px] -translate-x-[15%] translate-y-[-10%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
    </div>
  );
};
