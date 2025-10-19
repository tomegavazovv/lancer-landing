"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface GradientBlurBgProps {
  className?: string;
  children?: React.ReactNode;
}

export const GradientBlurBg = ({ className, children }: GradientBlurBgProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("min-h-screen w-full bg-white relative", className)}>
      {/* Purple Gradient Grid Right Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent),
            linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.3) 85%, rgba(255, 255, 255, 0.6) 95%, rgba(255, 255, 255, 1) 100%)
          `,
          backgroundSize: "96px 64px, 96px 64px, 100% 100%, 100% 100%",
        }}
      />
      {/* Your Content/Components */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
