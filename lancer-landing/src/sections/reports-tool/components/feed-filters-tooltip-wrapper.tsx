'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface FeedFiltersTooltipWrapperProps {
  children: ReactNode;
  disabled?: boolean;
}

export default function FeedFiltersTooltipWrapper({
  children,
  disabled = false,
}: FeedFiltersTooltipWrapperProps) {
  if (disabled) {
    return <div className="opacity-50 pointer-events-none">{children}</div>;
  }

  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
}

