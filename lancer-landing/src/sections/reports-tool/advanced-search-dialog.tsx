'use client';

import { HighlightedText } from '@/components/highlighted-text';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { SearchFields, SearchQueryBuilder } from 'lancer-shared';
import { HelpCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AdvancedSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (query: string) => void;
  initialQuery?: string;
}

export default function AdvancedSearchDialog({
  open,
  onOpenChange,
  onApply,
  initialQuery = '',
}: AdvancedSearchDialogProps) {
  const [fields, setFields] = useState<SearchFields>({
    allWords: '',
    anyWords: '',
    noneWords: '',
    exactPhrase: '',
    titleSearch: '',
    titleAny: '',
    skillsSearch: '',
  });

  const handleFieldChange = (field: keyof SearchFields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearField = (field: keyof SearchFields) => {
    setFields((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleApply = () => {
    const query = SearchQueryBuilder.buildQuery(fields);
    onApply(query);
    onOpenChange(false);
  };

  const handleClear = () => {
    setFields({
      allWords: '',
      anyWords: '',
      noneWords: '',
      exactPhrase: '',
      titleSearch: '',
      titleAny: '',
      skillsSearch: '',
    });
  };

  // Track the previous open state to detect when dialog is newly opened
  const prevOpenRef = useRef(false);

  useEffect(() => {
    // Only reset fields when the dialog transitions from closed to open
    // Don't reset if initialQuery changes while dialog is already open
    if (open && !prevOpenRef.current) {
      if (initialQuery && initialQuery.trim() && initialQuery !== '*') {
        try {
          const parsedFields = SearchQueryBuilder.parseQuery(initialQuery);
          setFields(parsedFields);
        } catch (error) {
          // If parsing fails, fall back to empty fields
          console.warn('Failed to parse query:', initialQuery, error);
          setFields({
            allWords: '',
            anyWords: '',
            noneWords: '',
            exactPhrase: '',
            titleSearch: '',
            titleAny: '',
            skillsSearch: '',
          });
        }
      } else {
        setFields({
          allWords: '',
          anyWords: '',
          noneWords: '',
          exactPhrase: '',
          titleSearch: '',
          titleAny: '',
          skillsSearch: '',
        });
      }
    }
    
    // Update the previous open state
    prevOpenRef.current = open;
  }, [open, initialQuery]);

  const isAnyFieldFilled = Object.values(fields).some((value) => value.trim());

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-xl max-h-[90vh] border border-white/20 bg-[#0A0A0A] flex flex-col'>
          <DialogHeader className='flex-shrink-0'>
            <div className='flex items-center justify-between'>
              <DialogTitle className='text-white'>Advanced search</DialogTitle>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => onOpenChange(false)}
                className='h-6 w-6 ml-2 text-white/70 hover:text-white hover:bg-white/10'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
            <DialogDescription className='text-left text-white/70'>
              Build complex search queries using boolean operators
            </DialogDescription>
            <div className='bg-white/10 border border-white/20 rounded-md p-3 mt-3'>
              <div className='text-sm text-white/90'>
                <div className='font-medium mb-1'>Search Tips:</div>
                <ul className='space-y-1 text-xs text-white/70'>
                  <li>
                    • Separate words with <strong>empty spaces</strong> (e.g.,
                    webflow wordpress)
                  </li>
                  <li>
                    • Use <strong>double quotes</strong> for exact phrases
                    (e.g., "brand strategist")
                  </li>
                </ul>
              </div>
            </div>
          </DialogHeader>
          <div className='h-px bg-white/20 flex-shrink-0' />

          <div className='flex flex-col gap-4 py-4 overflow-y-auto flex-1'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label
                  htmlFor='allWords'
                  className='text-sm font-medium text-white'
                >
                  All of these words
                </label>
                <TooltipPrimitive.Root>
                  <TooltipTrigger asChild>
                    <HelpCircle className='h-4 w-4 text-white/50 hover:text-white/70 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#0A0A0A] border border-white/20 text-white'>
                    <p>
                      All words must appear anywhere in the job posting (AND
                      operator)
                    </p>
                    <p className='text-xs text-white/70 mt-1'>
                      Separate words with spaces. Use quotes for phrases.
                    </p>
                  </TooltipContent>
                </TooltipPrimitive.Root>
              </div>
              <div className='relative'>
                <AutosizeTextarea
                  id='allWords'
                  placeholder='shopify cro'
                  value={fields.allWords}
                  onChange={(e) =>
                    handleFieldChange('allWords', e.target.value)
                  }
                  minHeight={52}
                  maxHeight={200}
                  className='pr-8 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#D94C58]'
                />
                {fields.allWords && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-2 h-6 w-6 text-white/50 hover:text-white hover:bg-white/10'
                    onClick={() => handleClearField('allWords')}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
              {fields.allWords && (
                <div className='mt-2'>
                  <HighlightedText text={fields.allWords} />
                </div>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label
                  htmlFor='anyWords'
                  className='text-sm font-medium text-white'
                >
                  Any of these words
                </label>
                <TooltipPrimitive.Root>
                  <TooltipTrigger asChild>
                    <HelpCircle className='h-4 w-4 text-white/50 hover:text-white/70 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#0A0A0A] border border-white/20 text-white'>
                    <p>At least one of these words must appear (OR operator)</p>
                    <p className='text-xs text-white/70 mt-1'>
                      Separate words with spaces. Use quotes for phrases.
                    </p>
                  </TooltipContent>
                </TooltipPrimitive.Root>
              </div>
              <div className='relative'>
                <AutosizeTextarea
                  id='anyWords'
                  placeholder='wordpress webflow'
                  value={fields.anyWords}
                  onChange={(e) =>
                    handleFieldChange('anyWords', e.target.value)
                  }
                  minHeight={52}
                  maxHeight={200}
                  className='pr-8 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#D94C58]'
                />
                {fields.anyWords && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-2 h-6 w-6 text-white/50 hover:text-white hover:bg-white/10'
                    onClick={() => handleClearField('anyWords')}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
              {fields.anyWords && (
                <div className='mt-2'>
                  <HighlightedText text={fields.anyWords} />
                </div>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label
                  htmlFor='titleSearch'
                  className='text-sm font-medium text-white'
                >
                  Title search (All)
                </label>
                <TooltipPrimitive.Root>
                  <TooltipTrigger asChild>
                    <HelpCircle className='h-4 w-4 text-white/50 hover:text-white/70 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#0A0A0A] border border-white/20 text-white'>
                    <p>
                      All words must appear anywhere in the job title (AND
                      operator)
                    </p>
                    <p className='text-xs text-white/70 mt-1'>
                      Separate words with spaces. Use quotes for phrases.
                    </p>
                  </TooltipContent>
                </TooltipPrimitive.Root>
              </div>
              <div className='relative'>
                <AutosizeTextarea
                  id='titleSearch'
                  placeholder='shopify expert'
                  value={fields.titleSearch}
                  onChange={(e) =>
                    handleFieldChange('titleSearch', e.target.value)
                  }
                  minHeight={52}
                  maxHeight={200}
                  className='pr-8 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#D94C58]'
                />
                {fields.titleSearch && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-2 h-6 w-6 text-white/50 hover:text-white hover:bg-white/10'
                    onClick={() => handleClearField('titleSearch')}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
              {fields.titleSearch && (
                <div className='mt-2'>
                  <HighlightedText text={fields.titleSearch} />
                </div>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label
                  htmlFor='titleAny'
                  className='text-sm font-medium text-white'
                >
                  Title search (Any)
                </label>
                <TooltipPrimitive.Root>
                  <TooltipTrigger asChild>
                    <HelpCircle className='h-4 w-4 text-white/50 hover:text-white/70 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#0A0A0A] border border-white/20 text-white'>
                    <p>
                      At least one word must appear in the job title (OR
                      operator)
                    </p>
                    <p className='text-xs text-white/70 mt-1'>
                      Separate words with spaces. Use quotes for phrases.
                    </p>
                  </TooltipContent>
                </TooltipPrimitive.Root>
              </div>
              <div className='relative'>
                <AutosizeTextarea
                  id='titleAny'
                  placeholder='developer designer'
                  value={fields.titleAny}
                  onChange={(e) =>
                    handleFieldChange('titleAny', e.target.value)
                  }
                  minHeight={52}
                  maxHeight={200}
                  className='pr-8 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#D94C58]'
                />
                {fields.titleAny && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-2 h-6 w-6 text-white/50 hover:text-white hover:bg-white/10'
                    onClick={() => handleClearField('titleAny')}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
              {fields.titleAny && (
                <div className='mt-2'>
                  <HighlightedText text={fields.titleAny} />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className='flex flex-row justify-between sm:justify-between flex-shrink-0 border-t border-white/20 bg-[#0A0A0A] pt-4 mt-4'>
            <Button
              variant='ghost'
              onClick={handleClear}
              disabled={!isAnyFieldFilled}
              className='px-3 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50'
            >
              Clear
            </Button>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={() => onOpenChange(false)}
                className='border-white/20 text-black hover:bg-gray-100'
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className='bg-[#D94C58] text-white hover:bg-[#c43d48]'
              >
                Apply
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
