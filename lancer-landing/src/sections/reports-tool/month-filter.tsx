'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { getPastThreeMonths } from './utils';

interface MonthFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function MonthFilter({
  value,
  onValueChange,
  className,
}: MonthFilterProps) {
  const monthOptions = getPastThreeMonths();

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <Calendar className='w-4 h-4 text-white/70' />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className='w-[200px] bg-white/10 border-white/20 text-white hover:bg-white/15 focus:ring-white/30'>
          <SelectValue placeholder='Select month' />
        </SelectTrigger>
        <SelectContent className='bg-white border-border'>
          {monthOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
