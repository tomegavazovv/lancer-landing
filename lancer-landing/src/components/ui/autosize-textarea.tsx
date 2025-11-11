'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export interface AutosizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

const AutosizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutosizeTextareaProps
>(({ className, minHeight = 52, maxHeight = 200, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = React.useState(minHeight);

  React.useImperativeHandle(ref, () => textareaRef.current!);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = 'auto';
      const scrollHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight
      );
      textarea.style.height = `${scrollHeight}px`;
      setHeight(scrollHeight);
    };

    adjustHeight();
    textarea.addEventListener('input', adjustHeight);
    return () => textarea.removeEventListener('input', adjustHeight);
  }, [minHeight, maxHeight, props.value]);

  return (
    <textarea
      ref={textareaRef}
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-y-auto',
        className
      )}
      style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
      {...props}
    />
  );
});

AutosizeTextarea.displayName = 'AutosizeTextarea';

export { AutosizeTextarea };
