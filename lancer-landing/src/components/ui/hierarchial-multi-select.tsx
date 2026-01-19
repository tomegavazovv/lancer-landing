import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { JOB_FILTER_OPTIONS } from 'lancer-shared';
import { ChevronDown, ChevronRight, SearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

interface CategoryOption {
  label: string;
  value: string;
  children?: string[];
}

interface HierarchicalMultiSelectProps {
  options: CategoryOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  maxCount?: number;
  trimContent?: boolean;
  maxRows?: number;
  className?: string;
  disabled?: boolean;
}

const PARENT_CATEGORIES = JOB_FILTER_OPTIONS.HIERARCHICAL_CATEGORIES.map(
  (category) => category.value
) as string[];

export function HierarchicalMultiSelect({
  options,
  value,
  onChange,
  placeholder,
  maxCount = 3,
  trimContent = false,
  maxRows = 1,
  className,
  disabled = false,
}: HierarchicalMultiSelectProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getAllCategoryValues = useCallback(() => {
    const values: string[] = [];
    options.forEach((category) => {
      if (category.children) {
        values.push(...category.children);
      }
    });
    return values;
  }, [options]);

  const toggleCategory = (categoryValue: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((v) => v !== categoryValue)
        : [...prev, categoryValue]
    );
  };

  const handleCategorySelect = (categoryOption: CategoryOption, isSelected: boolean) => {
    let newValues = [...value];

    if (isSelected) {
      newValues.push(categoryOption.value);

      if (categoryOption.children) {
        categoryOption.children.forEach((child) => {
          if (!newValues.includes(child)) {
            newValues.push(child);
          }
        });
      }
    } else {
      newValues = newValues.filter((v) => v !== categoryOption.value);

      if (categoryOption.children) {
        categoryOption.children.forEach((child) => {
          newValues = newValues.filter((v) => v !== child);
        });
      }
    }

    onChange(newValues);
  };

  const handleSelectAll = () => {
    if (value.length === getAllCategoryValues().length) {
      onChange([]);
    } else {
      onChange(getAllCategoryValues());
    }
  };

  const handleClear = () => {
    onChange([]);
  };

  const filterCategories = (categories: CategoryOption[]) => {
    if (!searchQuery) return categories;

    return categories.filter((category) => {
      const matchesParent = category.label.toLowerCase().includes(searchQuery.toLowerCase());
      const hasMatchingChildren = category.children?.some((child) =>
        child.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesParent || hasMatchingChildren;
    });
  };

  const getSelectedItemLabels = useCallback(() => {
    const result: { label: string; value: string }[] = [];

    options.forEach((category) => {
      if (value.includes(category.value)) {
        result.push({ label: category.label, value: category.value });
      }
    });

    options.forEach((category) => {
      if (category.children) {
        category.children.forEach((childValue) => {
          if (value.includes(childValue) && !value.includes(category.value)) {
            result.push({ label: childValue, value: childValue });
          }
        });
      }
    });

    return result;
  }, [value, options]);

  const renderCategory = useCallback(
    (category: CategoryOption) => {
      const isExpanded = expandedCategories.includes(category.value);
      const isSelected = category.children?.every((child) => value.includes(child));
      const hasChildren = category.children && category.children.length > 0;

      // Check if this category or any of its children match the search
      const matchesSearch = searchQuery
        ? category.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.children?.some((child) =>
            child.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;

      if (!matchesSearch) return null;

      return (
        <div key={category.value} className="category-item">
          <div className="flex items-center gap-2 py-1.5 px-2 rounded-sm hover:bg-white/10 transition-colors">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => handleCategorySelect(category, checked as boolean)}
              id={`category-${category.value}`}
              className="border-white/40 data-[state=checked]:bg-[#D94C58] data-[state=checked]:border-[#D94C58] data-[state=checked]:text-white"
            />
            <label
              htmlFor={`category-${category.value}`}
              className="flex-grow cursor-pointer text-sm text-white/90"
            >
              {category.label}
            </label>

            {hasChildren && (
              <button
                type="button"
                onClick={() => toggleCategory(category.value)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-white/70" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-white/70" />
                )}
              </button>
            )}
          </div>

          {isExpanded && hasChildren && (
            <div className="pl-6 border-l border-white/20 ml-2">
              {category.children!.map((child) => (
                <div key={child} className="flex items-center gap-2 py-1.5 px-2 rounded-sm hover:bg-white/10 transition-colors">
                  <Checkbox
                    checked={value.includes(child)}
                    onCheckedChange={(checked) => {
                      let newValues = checked
                        ? [...value, child]
                        : value.filter((v) => v !== child);
                      if (category?.children?.some((v) => !newValues.includes(v))) {
                        newValues = newValues.filter((v) => v !== category.value);
                      }

                      if (checked && newValues.length === category?.children?.length) {
                        handleCategorySelect(category, true);
                      } else onChange(newValues);
                    }}
                    id={`category-${child}`}
                    className="border-white/40 data-[state=checked]:bg-[#D94C58] data-[state=checked]:border-[#D94C58] data-[state=checked]:text-white"
                  />
                  <label htmlFor={`category-${child}`} className="flex-grow cursor-pointer text-sm text-white/90">
                    {child}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
    [expandedCategories, value, searchQuery]
  );

  const selectedLabels = getSelectedItemLabels();

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className={cn(
            'flex w-full p-1 rounded-md border border-white/20 shadow-sm min-h-10 h-auto items-center justify-between bg-white/5 hover:bg-white/10 focus:ring-1 focus:ring-[#d94c58] focus:border-[#d94c58] transition-colors',
            trimContent && maxRows === 1 && 'h-10',
            className
          )}
          disabled={disabled}
        >
          {value.length > 0 ? (
            <div className="flex items-start w-full truncate mx-2">
              <p className="text-white/90 text-sm">
                {selectedLabels.map((label) => label.label).join(', ')}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full truncate mx-auto">
              <span className="text-sm text-white/60 mx-2">{placeholder}</span>
              <ChevronDown className="h-4 cursor-pointer text-white/60 mx-2" />
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0 mr-1 bg-[#0A0A0A] border-white/20" align="start" onWheel={(e) => e.stopPropagation()}>
        <div className="p-2">
          <div className="flex items-center mb-2 border border-white/20 rounded-md px-2 bg-white/5">
            <SearchIcon className="h-4 w-4 text-white/60" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex items-center gap-2 py-1.5 px-2 rounded-sm hover:bg-white/10 transition-colors border-b border-white/20 mb-2">
            <Checkbox
              checked={value.length === getAllCategoryValues().length && value.length > 0}
              onCheckedChange={handleSelectAll}
              id="select-all-categories"
              className="border-white/40 data-[state=checked]:bg-[#D94C58] data-[state=checked]:border-[#D94C58] data-[state=checked]:text-white"
            />
            <label
              htmlFor="select-all-categories"
              className="flex-grow cursor-pointer text-sm font-medium text-white/90"
            >
              Select All Categories
            </label>
          </div>

          <div className="max-h-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
            {filterCategories(options).map(renderCategory)}
          </div>

          <div className="flex items-center justify-between divide-x divide-white/20 pt-2 mt-2 border-t border-white/20">
            {value.length > 0 && (
              <button
                onClick={handleClear}
                className="text-sm text-white/90 hover:text-white hover:underline transition-all duration-300 px-2 py-1 w-full"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsPopoverOpen(false)}
              className={cn(
                'ml-auto text-sm text-white/70 hover:text-white hover:underline transition-all duration-300 px-2 py-1 w-full',
                !value.length && 'w-full text-center'
              )}
            >
              Close
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

