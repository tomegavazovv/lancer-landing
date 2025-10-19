"use client";

import { cn } from "@/lib/utils";

interface DemoProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Demo({ className, children }: DemoProps) {
  return (
    <div className={cn("min-h-screen w-full bg-white relative", className)}>
      {/* Blurred Purple Circle Background */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      {/* Your Content/Components */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
