import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import AdvancedSearchDialog from '@/sections/reports-tool/advanced-search-dialog';

interface BooleanQueryInputProps {
  value: string;
  onChange: (query: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function BooleanQueryInput({
  value,
  onChange,
  disabled = false,
  placeholder = 'Click "Build Query" to create advanced search filters',
}: BooleanQueryInputProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleAdvancedApply = (query: string) => {
    onChange(query);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsAdvancedOpen(true);
    }
  };

  const displayValue = value && value.length > 30 ? `${value.substring(0, 30)}...` : value;

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={handleInputClick}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d94c58] focus-visible:border-[#d94c58] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            'cursor-pointer hover:bg-gray-50 pr-32',
            disabled && 'cursor-not-allowed hover:bg-white'
          )}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!disabled) {
                setIsAdvancedOpen(true);
              }
            }}
            disabled={disabled}
            className="h-8 px-3 text-xs font-medium border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Build Query
          </Button>
        </div>
      </div>

      <AdvancedSearchDialog
        open={isAdvancedOpen}
        onOpenChange={setIsAdvancedOpen}
        onApply={handleAdvancedApply}
        initialQuery={value}
      />
    </div>
  );
}

