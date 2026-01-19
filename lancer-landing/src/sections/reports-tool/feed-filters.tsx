'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { HierarchicalMultiSelect } from '@/components/ui/hierarchial-multi-select';
import { MultiSelect } from '@/components/ui/multi-select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFilterOptions } from '@/hooks/lead/use-filter-options';
import { cn } from '@/lib/utils';
import {
  Counts,
  GOAT_COUNTRIES,
  JOB_FILTER_OPTIONS,
  JobFilters as LeadFilters,
} from 'lancer-shared';
import { filter, includes, map } from 'lodash';
import { Clock, Star, Tag } from 'lucide-react';
import { ReactNode } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import FeedFiltersTooltipWrapper from './components/feed-filters-tooltip-wrapper';

interface FeedFiltersProps {
  isLoadingFeed: boolean;
  lastMonthTotal: number;
  lastMonthTotalWithEmptyFilters: number;
  totalJobs: number;
  total: number;
  control: Control<LeadFilters>;
  disabled: boolean;
  counts: Counts | undefined;
}

function LabeledCheckbox({
  id,
  checked,
  onCheckedChange,
  labelContent,
  labelClassName,
  checkboxClassName,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
  labelContent: ReactNode;
  checkboxClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        disabled={disabled}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'size-4 border-white/40 data-[state=checked]:bg-[#D94C58] data-[state=checked]:border-[#D94C58] data-[state=checked]:text-white',
          checkboxClassName
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          'flex-grow cursor-pointer text-base text-white/90',
          disabled && 'opacity-50 cursor-not-allowed',
          labelClassName
        )}
      >
        {labelContent}
      </label>
    </div>
  );
}

export default function FeedFilters({
  isLoadingFeed,
  lastMonthTotal,
  lastMonthTotalWithEmptyFilters,
  totalJobs,
  control,
  total,
  disabled,
  counts,
}: FeedFiltersProps) {
  const [
    includedCountries,
    excludedCountries,
    includedCategories,
    excludedCategories,
    minReviewScore,
    minNumReviews,
  ] = useWatch({
    control,
    name: [
      'clientInfo.clientLocationIncludes',
      'clientInfo.clientLocationExcludes',
      'categories.includes',
      'categories.excludes',
      'clientInfo.minReviewScore',
      'clientInfo.minNumReviews',
    ],
  });

  const { countries, isLoading } = useFilterOptions();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-6">
        
        
        <FeedFiltersTooltipWrapper disabled={disabled}>
          <div className="flex flex-col gap-3">
            <div className="text-base font-bold text-white">Filters</div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Only from these categories
              </label>
              <Controller
                name="categories.includes"
                control={control}
                render={({ field }) => (
                  <HierarchicalMultiSelect
                    options={[...JOB_FILTER_OPTIONS.HIERARCHICAL_CATEGORIES] as any}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select categories"
                    disabled={disabled || !!excludedCategories?.length}
                  />
                )}
              />
            </div>
            
          </div>
        </FeedFiltersTooltipWrapper>
        <FeedFiltersTooltipWrapper disabled={disabled}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-3">
              <div className="text-base font-bold text-white">Experience Level</div>
              <div className="flex flex-col">
                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-col gap-2">
                      {map(JOB_FILTER_OPTIONS.EXPERIENCE_LEVELS, (level) => (
                        <div key={level} className="flex items-center gap-2.5">
                          <LabeledCheckbox
                            id={level}
                            labelContent={
                              <>
                                {level}
                                {!!counts && (
                                  <span className="text-sm text-white/70">
                                    &nbsp;({counts?.experienceLevel?.[level] ?? 0})
                                  </span>
                                )}
                              </>
                            }
                            checked={includes(value, level)}
                            onCheckedChange={(checked) =>
                              onChange(
                                !value
                                  ? [level]
                                  : !checked
                                  ? filter(value, (val) => val !== level)
                                  : [...value, level]
                              )
                            }
                            disabled={disabled}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-base font-bold text-white">Verifications</div>
              <div className="flex flex-col gap-2.5">
                <Controller
                  name="clientInfo.isPaymentVerified"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <LabeledCheckbox
                      id="isPaymentVerified"
                      checked={value === 'true'}
                      onCheckedChange={(val) => onChange(val ? 'true' : 'all')}
                      labelContent={
                        <>
                          Payment Verified
                          {!!counts && (
                            <span className="text-sm text-white/70">
                              &nbsp;({counts?.paymentVerified?.['true'] ?? 0})
                            </span>
                          )}
                        </>
                      }
                      disabled={disabled}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </FeedFiltersTooltipWrapper>
        <FeedFiltersTooltipWrapper disabled={disabled}>
          <div className="flex flex-col gap-3">
            <div className="text-base font-bold text-white">Client Location</div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Only from these countries
              </label>
              <Controller
                name="clientInfo.clientLocationIncludes"
                control={control}
                render={({ field }) => {
                  const handleGoatCountriesSelect = () => {
                    const goatCountryValues = GOAT_COUNTRIES.filter((country) =>
                      countries?.some((c) => c.value === country || c.label === country)
                    )
                      .map(
                        (country) =>
                          countries?.find((c) => c.value === country || c.label === country)?.value
                      )
                      .filter(Boolean) as string[];

                    field.onChange(goatCountryValues);
                  };

                  const allOptions = [
                    {
                      label: 'Select Highest Paying Countries',
                      value: '__GOAT_COUNTRIES__',
                      isSpecial: true,
                    },
                    ...(isLoading ? [] : countries || []),
                  ];

                  return (
                    <MultiSelect
                      options={allOptions}
                      onValueChange={field.onChange}
                      onSpecialAction={(value) => {
                        if (value === '__GOAT_COUNTRIES__') {
                          handleGoatCountriesSelect();
                        }
                      }}
                      value={field.value || []}
                      placeholder="Include countries"
                      variant="inverted"
                      disabled={disabled || !!excludedCountries?.length}
                      trimContent
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Only NOT from these countries
              </label>
              <Controller
                name="clientInfo.clientLocationExcludes"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={isLoading ? [] : countries || []}
                    onValueChange={field.onChange}
                    value={field.value || []}
                    placeholder="Exclude countries"
                    variant="inverted"
                    disabled={disabled || !!includedCountries?.length}
                    trimContent
                  />
                )}
              />
            </div>
          </div>
        </FeedFiltersTooltipWrapper>
        <FeedFiltersTooltipWrapper disabled={disabled}>
          <div className="flex flex-col gap-3">
            <div className="text-base font-bold text-white">Client Requirements</div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Total spent
              </label>
              <div className="flex gap-2">
                <Controller
                  name="clientInfo.minTotalSpent"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center  w-full">
                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-[10px] rounded-l-md">
                        from
                      </span>
                      <NumericFormat
                        value={field.value}
                        onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                        thousandSeparator
                        allowNegative={false}
                        aria-label="Minimum Total Spent"
                        placeholder="0"
                        className="pl-16 pr-8 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                        inputMode="numeric"
                        disabled={disabled}
                      />
                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                        $
                      </span>
                    </div>
                  )}
                />
                <Controller
                  name="clientInfo.maxTotalSpent"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center w-full">
                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-[10px] rounded-l-md">
                        to
                      </span>
                      <NumericFormat
                        value={field.value}
                        onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                        thousandSeparator
                        allowNegative={false}
                        aria-label="Maximum Total Spent"
                        className="pl-12 pr-8 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                        inputMode="numeric"
                        disabled={disabled}
                      />
                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                        $
                      </span>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <Controller
                name="totalSpentIncludeClientsWithLessThanXPostedJobs"
                control={control}
                render={({ field }) => {
                  const minTotalSpent = useWatch({ control, name: 'clientInfo.minTotalSpent' });
                  const maxTotalSpent = useWatch({ control, name: 'clientInfo.maxTotalSpent' });
                  const isTotalSpentFilterDisabled = minTotalSpent == null && maxTotalSpent == null;

                  return (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-sm 2xl:text-base">
                            <span
                              className={
                                isTotalSpentFilterDisabled ? 'text-white/50' : 'text-white/80'
                              }
                            >
                              Include clients with{' '}
                            </span>
                            <div className="relative flex items-center w-16">
                              <span className="absolute pointer-events-none select-none text-sm  bg-white/10 p-[5px] px-[10px] rounded-l-md text-white/70">
                                {'≤'}
                              </span>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={field.value || ''}
                                onChange={(e) =>
                                  field.onChange(e.target.value ? parseInt(e.target.value) : null)
                                }
                                aria-label="Number of posted jobs for total spent"
                                className={`py-0.5 px-2 pl-10 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full text-center focus:outline-none focus:border-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                  disabled || isTotalSpentFilterDisabled
                                    ? 'text-white/30 bg-white/5'
                                    : ''
                                }`}
                                disabled={disabled || isTotalSpentFilterDisabled}
                              />
                            </div>
                            <span
                              className={
                                isTotalSpentFilterDisabled ? 'text-white/50' : 'text-white/80'
                              }
                            >
                              posted jobs
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[300px]">
                          Include jobs from clients with less than X posted jobs, regardless of
                          their total spent
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Client average hourly rate
              </label>
              <div className="flex gap-2">
                <Controller
                  name="clientInfo.minAvgHourlyRate"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center w-full">
                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-[10px] rounded-l-md">
                        from
                      </span>
                      <NumericFormat
                        value={field.value}
                        onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                        thousandSeparator
                        allowNegative={false}
                        decimalScale={2}
                        aria-label="Minimum Average Hourly Rate"
                        placeholder="0"
                        className="pl-16 pr-16 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                        inputMode="numeric"
                        disabled={disabled}
                      />
                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                        $/hr
                      </span>
                    </div>
                  )}
                />
                <Controller
                  name="clientInfo.maxAvgHourlyRate"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center w-full">
                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-[10px] rounded-l-md">
                        to
                      </span>
                      <NumericFormat
                        value={field.value}
                        onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                        thousandSeparator
                        allowNegative={false}
                        decimalScale={2}
                        aria-label="Maximum Average Hourly Rate"
                        className="pl-12 pr-16 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                        inputMode="numeric"
                        disabled={disabled}
                      />
                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                        $/hr
                      </span>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <Controller
                name="averageHourlyRateIncludeClientsWithLessThanXPostedJobs"
                control={control}
                render={({ field }) => {
                  const minAvgHourlyRate = useWatch({
                    control,
                    name: 'clientInfo.minAvgHourlyRate',
                  });
                  const maxAvgHourlyRate = useWatch({
                    control,
                    name: 'clientInfo.maxAvgHourlyRate',
                  });
                  const isAvgHourlyRateFilterDisabled =
                    minAvgHourlyRate == null && maxAvgHourlyRate == null;

                  return (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-sm 2xl:text-base">
                            <span
                              className={
                                isAvgHourlyRateFilterDisabled ? 'text-white/50' : 'text-white/80'
                              }
                            >
                              Include clients with{' '}
                            </span>
                            <div className="relative flex items-center w-16">
                              <span className="absolute pointer-events-none select-none text-sm  bg-white/10 p-[5px] px-[10px] rounded-l-md text-white/70">
                                {'≤'}
                              </span>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={field.value || ''}
                                onChange={(e) =>
                                  field.onChange(e.target.value ? parseInt(e.target.value) : null)
                                }
                                aria-label="Number of posted jobs for average hourly rate"
                                className={`py-0.5 px-2 pl-10 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full text-center focus:outline-none focus:border-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                  disabled || isAvgHourlyRateFilterDisabled
                                    ? 'text-white/30 bg-white/5'
                                    : ''
                                }`}
                                disabled={disabled || isAvgHourlyRateFilterDisabled}
                              />
                            </div>
                            <span
                              className={
                                isAvgHourlyRateFilterDisabled ? 'text-white/50' : 'text-white/80'
                              }
                            >
                              posted jobs
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[300px]">
                          Include jobs from clients with less than X posted jobs, regardless of
                          their average hourly rate
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Client hire rate
              </label>
              <div className="flex gap-2">
                <Controller
                  name="clientInfo.minHireRate"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center w-full">
                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-[10px] rounded-l-md">
                        from
                      </span>
                      <NumericFormat
                        value={field.value}
                        onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                        allowNegative={false}
                        decimalScale={0}
                        isAllowed={(values) => {
                          const { floatValue } = values;
                          return (
                            floatValue === undefined ||
                            floatValue === null ||
                            (floatValue >= 0 && floatValue <= 100)
                          );
                        }}
                        aria-label="Minimum Hire Rate"
                        placeholder="0"
                        className="pl-16 pr-8 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                        inputMode="numeric"
                        disabled={disabled}
                      />
                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                        %
                      </span>
                    </div>
                  )}
                />
                <Controller
                  name="clientInfo.maxHireRate"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center w-full">
                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-[10px] rounded-l-md">
                        to
                      </span>
                      <NumericFormat
                        value={field.value}
                        onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                        allowNegative={false}
                        decimalScale={0}
                        isAllowed={(values) => {
                          const { floatValue } = values;
                          return (
                            floatValue === undefined ||
                            floatValue === null ||
                            (floatValue >= 0 && floatValue <= 100)
                          );
                        }}
                        aria-label="Maximum Hire Rate"
                        className="pl-12 pr-8 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                        inputMode="numeric"
                        disabled={disabled}
                      />
                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                        %
                      </span>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <Controller
                name="includeClientsWithLessThanXPostedJobs"
                control={control}
                render={({ field }) => {
                  const minHireRate = useWatch({ control, name: 'clientInfo.minHireRate' });
                  const maxHireRate = useWatch({ control, name: 'clientInfo.maxHireRate' });
                  const isHireRateFilterDisabled = minHireRate == null && maxHireRate == null;

                  return (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-sm 2xl:text-base">
                            <span
                              className={
                                isHireRateFilterDisabled ? 'text-white/50' : 'text-white/80'
                              }
                            >
                              Include clients with{' '}
                            </span>
                            <div className="relative flex items-center w-16">
                              <span className="absolute pointer-events-none select-none text-sm  bg-white/10 p-[5px] px-[10px] rounded-l-md text-white/70">
                                {'\u2264'}
                              </span>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={field.value || ''}
                                onChange={(e) =>
                                  field.onChange(e.target.value ? parseInt(e.target.value) : null)
                                }
                                aria-label="Number of posted jobs"
                                className={`py-0.5 px-2 pl-10 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full text-center focus:outline-none focus:border-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                  disabled || isHireRateFilterDisabled
                                    ? 'text-white/30 bg-white/5'
                                    : ''
                                }`}
                                disabled={disabled || isHireRateFilterDisabled}
                              />
                            </div>
                            <span
                              className={
                                isHireRateFilterDisabled ? 'text-white/50' : 'text-white/80'
                              }
                            >
                              posted jobs
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[300px]">
                          Include jobs from clients with less than X posted jobs, regardless of
                          their hire rate
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Minimum client reviews
              </label>
              <Controller
                name="clientInfo.minNumReviews"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    value={field.value}
                    onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                    thousandSeparator
                    allowNegative={false}
                    decimalScale={0}
                    aria-label="Minimum Client Reviews"
                    placeholder="Min reviews"
                    className="py-2 px-3 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full focus:border-white/40"
                    inputMode="numeric"
                    disabled={disabled}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Client company size
              </label>
              <Controller
                name="clientInfo.companySize"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={JOB_FILTER_OPTIONS.CLIENT_SIZE.map((size) => ({
                      label: size,
                      value:
                        size === 'Individual client'
                          ? '1'
                          : size === 'Small company (2-9 people)'
                          ? '2'
                          : size === 'Mid-sized company (10-99 people)'
                          ? '10'
                          : size === 'Large company (100-1,000 people)'
                          ? '100'
                          : size === 'Large company (1,000+ people)'
                          ? '1000'
                          : 'null',
                    }))}
                    onValueChange={(values) => {
                      const numericValues = values.map((v) =>
                        v === 'null' ? null : parseInt(v, 10)
                      );
                      field.onChange(numericValues);
                    }}
                    value={(field.value || []).map((v: any) =>
                      v === null ? 'null' : v.toString()
                    )}
                    placeholder="Select company sizes"
                    variant="inverted"
                    disabled={disabled}
                    trimContent
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Minimum client rating
              </label>
              <Controller
                name="clientInfo.minReviewScore"
                control={control}
                render={({ field }) => (
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-3 text-white/70 pointer-events-none select-none">
                      <Star className="size-4 text-white/70" />
                    </span>
                    <NumericFormat
                      value={field.value}
                      onValueChange={({ floatValue }) => field.onChange(floatValue ?? null)}
                      allowNegative={false}
                      decimalScale={1}
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        return (
                          floatValue === undefined ||
                          floatValue === null ||
                          (floatValue >= 1 && floatValue <= 5)
                        );
                      }}
                      aria-label="Minimum Review Score"
                      placeholder="4.5"
                      className="pl-8 py-2 px-3 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full focus:border-white/40"
                      inputMode="numeric"
                      disabled={disabled}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col">
              <Controller
                name="includeClientsWithZeroReviews"
                control={control}
                render={({ field: { value, onChange } }) => {
                  const isDisabledNoReviewScore = !minReviewScore;
                  const isDisabledMinReviews = (minNumReviews ?? 0) > 0;
                  const isDisabled = disabled || isDisabledNoReviewScore || isDisabledMinReviews;

                  const getTooltipContent = () => {
                    if (isDisabledNoReviewScore) {
                      return 'Set a minimum review score first to enable this option';
                    }
                    if (isDisabledMinReviews) {
                      return 'Cannot include clients with 0 reviews when minimum review count is set';
                    }
                    return '';
                  };

                  const checkbox = (
                    <LabeledCheckbox
                      id="includeClientsWithZeroReviews"
                      checked={!!value}
                      onCheckedChange={onChange}
                      labelContent="Include clients with 0 reviews"
                      disabled={isDisabled}
                      labelClassName="text-sm text-white/80"
                      checkboxClassName="size-4"
                    />
                  );

                  if (isDisabledNoReviewScore || isDisabledMinReviews) {
                    return (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div>{checkbox}</div>
                          </TooltipTrigger>
                          <TooltipContent side="top">{getTooltipContent()}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  }

                  return checkbox;
                }}
              />
            </div>
          </div>
        </FeedFiltersTooltipWrapper>
        <FeedFiltersTooltipWrapper disabled={disabled}>
          <div className="flex flex-col gap-3">
            <div className="text-base font-bold text-white">Project Duration</div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center gap-2 text-sm 2xl:text-base text-white/80">
                Expected project duration
              </label>
              <Controller
                name="projectDuration"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={JOB_FILTER_OPTIONS.PROJECT_DURATION.map((duration) => ({
                      label: duration,
                      value: duration,
                    }))}
                    onValueChange={field.onChange}
                    value={field.value || []}
                    placeholder="Select duration"
                    variant="inverted"
                    disabled={disabled}
                    trimContent
                  />
                )}
              />
            </div>
          </div>
        </FeedFiltersTooltipWrapper>
        <FeedFiltersTooltipWrapper disabled={disabled}>
          <div className="flex flex-col gap-3">
            <div className="text-base font-bold text-white">Job Compensation</div>
            <div className="flex flex-col gap-2">
              <Controller
                name="payment.paymentType"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    {map(JOB_FILTER_OPTIONS.PAYMENT_TYPE, (type) => {
                      const checked = includes(value, type);

                      return (
                        <div key={type} className="flex flex-col gap-2">
                          <div className="flex items-center gap-2.5">
                            <LabeledCheckbox
                              id={type}
                              labelContent={
                                <>
                                  {type}
                                  {!!counts && (
                                    <span className="text-sm text-white/70">
                                      &nbsp;({counts?.paymentType?.[type] ?? 0})
                                    </span>
                                  )}
                                </>
                              }
                              checked={checked}
                              onCheckedChange={(checked) =>
                                onChange(
                                  !value
                                    ? [type]
                                    : !checked
                                    ? filter(value, (val) => val !== type)
                                    : [...value, type]
                                )
                              }
                              disabled={disabled}
                            />
                          </div>
                          {type === 'Hourly' && checked && (
                            <div className="flex items-center gap-2.5 w-full">
                              <Clock className="size-5 opacity-0" />
                              <div className="flex gap-2 w-full">
                                <Controller
                                  name="payment.minHourlyRate"
                                  control={control}
                                  render={({ field }) => (
                                    <div className="relative flex items-center w-full">
                                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-3 rounded-l-md">
                                        from
                                      </span>
                                      <NumericFormat
                                        value={field.value}
                                        onValueChange={({ floatValue }) =>
                                          field.onChange(floatValue ?? null)
                                        }
                                        thousandSeparator
                                        allowNegative={false}
                                        aria-label="Minimum Hourly Rate"
                                        placeholder="0"
                                        className="pl-16 pr-16 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                                        inputMode="numeric"
                                        disabled={disabled}
                                      />
                                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                                        $/hr
                                      </span>
                                    </div>
                                  )}
                                />
                                <Controller
                                  name="payment.maxHourlyRate"
                                  control={control}
                                  render={({ field }) => (
                                    <div className="relative flex items-center w-full">
                                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-3 rounded-r-md">
                                        to
                                      </span>
                                      <NumericFormat
                                        value={field.value}
                                        onValueChange={({ floatValue }) =>
                                          field.onChange(floatValue ?? null)
                                        }
                                        thousandSeparator
                                        allowNegative={false}
                                        aria-label="Maximum Hourly Rate"
                                        placeholder="1000"
                                        className="pl-12 pr-16 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                                        inputMode="numeric"
                                        disabled={disabled}
                                      />
                                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                                        $/hr
                                      </span>
                                    </div>
                                  )}
                                />
                              </div>
                            </div>
                          )}
                          {type === 'Fixed-price' && checked && (
                            <div className="flex items-center gap-2.5 w-full">
                              <Tag className="size-5 opacity-0" />
                              <div className="flex gap-2 w-full">
                                <Controller
                                  name="payment.minFixedPrice"
                                  control={control}
                                  render={({ field }) => (
                                    <div className="relative flex items-center w-full">
                                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-3 rounded-l-md">
                                        from
                                      </span>
                                      <NumericFormat
                                        value={field.value}
                                        onValueChange={({ floatValue }) =>
                                          field.onChange(floatValue ?? null)
                                        }
                                        thousandSeparator
                                        allowNegative={false}
                                        aria-label="Minimum Fixed Price"
                                        placeholder="0"
                                        className="pl-16 pr-8 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                                        inputMode="numeric"
                                        disabled={disabled}
                                      />
                                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                                        $
                                      </span>
                                    </div>
                                  )}
                                />
                                <Controller
                                  name="payment.maxFixedPrice"
                                  control={control}
                                  render={({ field }) => (
                                    <div className="relative flex items-center w-full">
                                      <span className="absolute text-white/70 pointer-events-none select-none text-sm bg-white/10 p-3 rounded-r-md">
                                        to
                                      </span>
                                      <NumericFormat
                                        value={field.value}
                                        onValueChange={({ floatValue }) =>
                                          field.onChange(floatValue ?? null)
                                        }
                                        thousandSeparator
                                        allowNegative={false}
                                        aria-label="Maximum Fixed Price"
                                        placeholder="10000"
                                        className="pl-12 pr-8 py-2 text-[14px] 2xl:text-base placeholder:text-white/40 text-white bg-white/5 border-white/20 rounded-md w-full outline-none focus:ring-0 focus:border-white/40"
                                        inputMode="numeric"
                                        disabled={disabled}
                                      />
                                      <span className="absolute right-3 text-white/60 text-xs pointer-events-none select-none">
                                        $
                                      </span>
                                    </div>
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </div>
          </div>
        </FeedFiltersTooltipWrapper>
        
      </div>
    </div>
  );
}

