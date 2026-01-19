// src/components/multi-select.tsx

import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, WandSparkles } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        inverted: 'inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
    /** If true, this is a special action option that triggers onSpecialAction instead of normal selection */
    isSpecial?: boolean;
  }[];

  /**
   * Callback function triggered when a special action option is selected.
   * Receives the value of the special option.
   */
  onSpecialAction?: (value: string) => void;

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  /**
   * The current selected values of the multi-select component.
   * Optional, defaults to an empty array.
   */
  value?: string[];

  /**
   * If true, trims content instead of wrapping to multiple lines
   * Optional, defaults to false.
   */
  trimContent?: boolean;

  /**
   * Maximum number of rows to display when trimContent is true.
   * Optional, defaults to 1.
   */
  maxRows?: number;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      onSpecialAction,
      variant,
      defaultValue = [],
      value,
      placeholder = 'Select options',
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      trimContent = false,
      maxRows = 1,
      ...props
    },
    ref
  ) => {
    const selectedValues = value !== undefined ? value : defaultValue;
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              'flex w-full overflow-hidden p-1 rounded-md border border-white/20 shadow-sm min-h-10 h-auto bg-white/5 hover:bg-white/10 [&_svg]:pointer-events-auto focus:ring-1 focus:ring-[#d94c58] focus:border-[#d94c58] transition-colors',
              trimContent && maxRows === 1 && 'h-10',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <p className='text-white/90 text-left truncate px-3 text-sm font-normal 2xl:text-base w-full'>
                {selectedValues
                  .map(
                    (value) =>
                      options.find((option) => option.value === value)?.label
                  )
                  .join(', ')}
              </p>
            ) : (
              <div className='flex items-center justify-between w-full mx-auto'>
                <span className='text-xs 2xl:text-sm text-white/60 mx-3 font-normal'>
                  {placeholder}
                </span>
                <ChevronDown className='h-4 cursor-pointer text-white/60 mx-2 shrink-0' />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0 mr-1 bg-[#0A0A0A] border-white/20'
          align='start'
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          onWheel={(e) => e.stopPropagation()}
        >
          <Command className='bg-[#0A0A0A] text-white'>
            <CommandInput
              placeholder='Search...'
              onKeyDown={handleInputKeyDown}
              className='text-white placeholder:text-white/50'
            />
            <CommandList>
              <CommandEmpty className='text-white/70'>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key='all'
                  onSelect={toggleAll}
                  className='cursor-pointer'
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-white/40',
                      selectedValues.length === options.length
                        ? 'bg-[#D94C58] border-[#D94C58] text-white'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className='h-4 w-4' />
                  </div>
                  <span className='text-white/90'>(Select All)</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  const isSpecial = option.isSpecial;
                  
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSpecial && onSpecialAction) {
                          onSpecialAction(option.value);
                        } else {
                          toggleOption(option.value);
                        }
                      }}
                      className='cursor-pointer'
                    >
                      {!isSpecial && (
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-white/40',
                            isSelected
                              ? 'bg-[#D94C58] border-[#D94C58] text-white'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon className='h-4 w-4' />
                        </div>
                      )}
                      {option.icon && (
                        <option.icon className='mr-2 h-4 w-4 text-white/70' />
                      )}
                      <span className='text-white/90'>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className='flex items-center justify-between'>
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className='flex-1 justify-center cursor-pointer text-white/90 hover:text-white'
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation='vertical'
                        className='flex min-h-6 h-full bg-white/20'
                      />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className='flex-1 justify-center cursor-pointer max-w-full text-white/90 hover:text-white'
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              'cursor-pointer my-2 text-foreground bg-background w-3 h-3',
              isAnimating ? '' : 'text-muted-foreground'
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
