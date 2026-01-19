'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { ChartContainer } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useKeywordAnalytics } from '@/hooks/use-upwork-analytics';
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Filter,
  Globe,
  Search,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import AdvancedSearchDialog from './advanced-search-dialog';
import { FilterBadges } from './components/filter-badges';

// Helper function to transform API response data
const transformJobsCountLast3Months = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    month: item.period || item.month || '',
    jobsPosted: item.count || item.jobsPosted || 0,
  }));
};

const transformTopCountries = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    country: item.country || '',
    jobsPosted: item.count || item.jobsPosted || 0,
  }));
};

const transformJobsByClientTotalSpent = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    bucket: item.range || item.bucket || '',
    clients: item.count || item.clients || item.jobsPosted || 0,
  }));
};

const transformJobsByClientHireRate = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    bucket: item.range || item.bucket || '',
    clients: item.count || item.clients || item.jobs || item.jobsPosted || 0,
  }));
};

const transformJobsByClientTotalJobsPosted = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    bucket: item.range || item.bucket || '',
    clients: item.count || item.clients || item.jobs || item.jobsPosted || 0,
  }));
};

const transformJobsByHour = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    hour: item.hour ? `${String(item.hour).padStart(2, '0')}:00` : '00:00',
    jobsPosted: item.count || item.jobsPosted || 0,
  }));
};

const transformJobsByDayOfWeek = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    day: item.day || '',
    jobsPosted: item.count || item.jobsPosted || 0,
  }));
};

const transformTop10Skills = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => {
    const skillName = item.skill || '';
    const truncatedSkill =
      skillName.length > 15 ? skillName.substring(0, 15) + '...' : skillName;
    return {
      skill: truncatedSkill,
      skillFull: skillName, // Store full name for tooltip
      jobsPosted: item.count || item.jobsPosted || 0,
    };
  });
};

const transformAverageHourlyRatePaidByCountry = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    country: item.country || '',
    avgHourlyRatePaid: item.average || item.avgHourlyRatePaid || 0,
  }));
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  format?: 'number' | 'currency' | 'percentage' | 'hourly';
  description?: string;
  trend?: number; // Percentage change
  isLoading?: boolean;
}

function MetricCardSkeleton() {
  return (
    <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
      {/* Subtle background glow */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-[#D94C58]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2' />
      <div className='absolute bottom-0 left-0 w-24 h-24 bg-[#D94C58]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2' />
      
      <div className='relative z-10'>
        <div className='flex items-start justify-between mb-4'>
          <div className='p-3 rounded-lg bg-white/10 animate-pulse w-12 h-12'></div>
          <div className='w-16 h-6 bg-white/10 rounded-md animate-pulse'></div>
        </div>
        <div className='space-y-1'>
          <div className='h-4 bg-white/10 rounded w-32 animate-pulse mb-2'></div>
          <div className='h-8 bg-white/10 rounded w-24 animate-pulse'></div>
          <div className='h-3 bg-white/10 rounded w-40 animate-pulse mt-2'></div>
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  // Generate random bar heights for a more realistic look
  const barHeights = [65, 85, 45, 75, 55, 90, 40, 70, 50, 80];

  return (
    <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
      {/* Subtle background glow */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
      
      <div className='relative z-10 min-h-[300px] w-full overflow-hidden'>
        {/* Loading overlay */}
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a2e]/80 backdrop-blur-sm'>
          <div className='flex flex-col items-center gap-3'>
            <div className='relative'>
              <div className='h-8 w-8 border-4 border-[#D94C58]/20 rounded-full'></div>
              <div className='h-8 w-8 border-4 border-transparent border-t-[#D94C58] rounded-full animate-spin absolute top-0 left-0'></div>
            </div>
            <p className='text-sm font-medium text-white/70 animate-pulse'>
              Loading chart data...
            </p>
          </div>
        </div>

        {/* Grid lines */}
        <div className='absolute inset-0 flex flex-col justify-between py-4 px-12'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='border-t border-dashed border-white/10'
              style={{ marginTop: i === 0 ? '0' : 'auto' }}
            />
          ))}
        </div>

        {/* Y-axis labels */}
        <div className='absolute left-2 top-0 bottom-10 flex flex-col justify-between py-4'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='h-3 w-10 bg-white/10 rounded-sm animate-pulse'
              style={{
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Chart bars */}
        <div className='absolute inset-0 flex items-end justify-center gap-2 px-12 pb-10'>
          {barHeights.map((height, i) => (
            <div
              key={i}
              className='flex-1 flex flex-col items-center gap-2 max-w-[60px]'
            >
              <div
                className='w-full bg-gradient-to-t from-[#D94C58]/40 to-[#D94C58]/20 rounded-t-md animate-pulse relative overflow-hidden'
                style={{
                  height: `${height}%`,
                  animationDelay: `${i * 0.1}s`,
                  minHeight: '20px',
                }}
              />
              <div
                className='h-2.5 w-10 bg-white/10 rounded-sm animate-pulse'
                style={{
                  animationDelay: `${i * 0.1 + 0.05}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  format = 'number',
  description,
  trend,
  isLoading = false,
}: MetricCardProps) {
  if (isLoading) {
    return <MetricCardSkeleton />;
  }
  const formatValue = () => {
    if (format === 'currency') {
      if (typeof value === 'number') {
        const rounded = Number(value.toFixed(2));
        if (rounded >= 1000) {
          return `$${(rounded / 1000).toFixed(2)}k`;
        }
        return `$${rounded.toFixed(2)}`;
      }
      return value;
    }
    if (format === 'hourly') {
      if (typeof value === 'number') {
        return `$${Number(value.toFixed(2))}/hr`;
      }
      return value;
    }
    if (format === 'percentage') {
      if (typeof value === 'number') {
        return `${Number(value.toFixed(2))}%`;
      }
      return `${value}%`;
    }
    if (typeof value === 'number') {
      return Number(value.toFixed(2)).toLocaleString();
    }
    return value.toLocaleString();
  };

  const isPositiveTrend = trend !== undefined && trend > 0;
  const isNegativeTrend = trend !== undefined && trend < 0;

  return (
    <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]'>
      {/* Subtle background glow */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-[#D94C58]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2' />
      <div className='absolute bottom-0 left-0 w-24 h-24 bg-[#D94C58]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2' />
      
      <div className='relative z-10'>
        <div className='flex items-start justify-between mb-4'>
          <div className='p-3 rounded-lg bg-[#D94C58]/10'>{icon}</div>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
                isPositiveTrend
                  ? 'bg-[#D94C58]/10 text-[#D94C58]'
                  : isNegativeTrend
                  ? 'bg-white/10 text-white/70'
                  : 'bg-white/10 text-white/80'
              }`}
            >
              {isPositiveTrend ? (
                <ArrowUp className='w-3 h-3' />
              ) : isNegativeTrend ? (
                <ArrowDown className='w-3 h-3' />
              ) : null}
              {Math.abs(trend).toFixed(2)}%
            </div>
          )}
        </div>
        <div className='space-y-1'>
          <p className='text-sm font-medium text-white/70 uppercase tracking-wide'>
            {label}
          </p>
          <p className='text-3xl font-bold text-white'>{formatValue()}</p>
          {description && (
            <p className='text-xs text-white/60 mt-2'>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface SearchInputProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  currentSearchKeyword: string;
  timePeriod?: 'lastMonth' | 'last5Months';
  onTimePeriodChange?: (period: 'lastMonth' | 'last5Months') => void;
  onOpenFilters?: () => void;
}

function SearchInput({
  onSearch,
  isSearching,
  currentSearchKeyword,
  timePeriod,
  onTimePeriodChange,
  onOpenFilters,
}: SearchInputProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApply = (query: string) => {
    onSearch(query);
  };

  const handleInputClick = () => {
    if (!isSearching) {
      setDialogOpen(true);
    }
  };

  const handleButtonClick = () => {
    if (!isSearching) {
      setDialogOpen(true);
    }
  };

  const displayValue =
    currentSearchKeyword && currentSearchKeyword.length > 50
      ? `${currentSearchKeyword.substring(0, 50)}...`
      : currentSearchKeyword;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='relative flex gap-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <Input
            type='text'
            placeholder='Enter query to analyze (e.g., "React developer", "Logo design")'
            value={displayValue || ''}
            readOnly
            onClick={handleInputClick}
            disabled={isSearching}
            className='pl-12 pr-32 h-14 text bg-white/95 border-white/20 text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#D94C58] cursor-pointer hover:bg-white transition-colors disabled:cursor-not-allowed disabled:opacity-50'
          />
          
          <button
            onClick={handleButtonClick}
            disabled={isSearching}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-[#D94C58] text-white rounded-md font-medium hover:bg-[#c43d48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
           <Settings className='w-4 h-4' /> {isSearching ? 'Searching...' : 'Build Query'}
          </button>
        </div>
        {onOpenFilters && (
          <Button
            onClick={onOpenFilters}
            variant='outline'
            className='h-14 text-md bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 hover:!text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-semibold px-4 shadow-lg shadow-white/10 hover:shadow-white/20 [&:hover]:text-white [&_svg]:text-white'
          >
            <Filter className='h-4 w-4 mr-2 text-white' />
            Filters
          </Button>
        )}
        {timePeriod && onTimePeriodChange && (
          <Select value={timePeriod} onValueChange={onTimePeriodChange}>
            <SelectTrigger className='h-14 text-md bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 hover:!text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-semibold px-4 shadow-lg shadow-white/10 hover:shadow-white/20 w-auto min-w-[150px] [&>span]:text-white'>
              <SelectValue className='text-white' />
            </SelectTrigger>
            <SelectContent className='bg-[#1A1A1A] border-white/10'>
              <SelectItem value='lastMonth' className='text-white hover:bg-white/10 focus:bg-white/10 focus:text-white'>
                Last Month
              </SelectItem>
              <SelectItem value='last5Months' className='text-white hover:bg-white/10 focus:bg-white/10 focus:text-white'>
                Last 6 Months
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <p className='mt-12 text-center text-white/80'>
        Showing results for:{' '}
        <span className='font-semibold text-white'>
          {currentSearchKeyword || 'all queries'}
        </span>
      </p>
      <AdvancedSearchDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApply={handleApply}
        initialQuery={currentSearchKeyword}
      />
    </div>
  );
}

interface KeywordBreakdownProps {
  filters?: import('lancer-shared').JobFilters;
  timePeriod?: 'lastMonth' | 'last5Months';
  onTimePeriodChange?: (period: 'lastMonth' | 'last5Months') => void;
  onFiltersChange?: (filters: import('lancer-shared').JobFilters) => void;
  onAppliedFiltersChange?: (filters: import('lancer-shared').JobFilters) => void;
  onOpenFilters?: () => void;
}

export function KeywordBreakdown({
  filters,
  timePeriod,
  onTimePeriodChange,
  onFiltersChange,
  onAppliedFiltersChange,
  onOpenFilters,
}: KeywordBreakdownProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Automatically trigger search with empty query when component mounts
  useEffect(() => {
    if (!hasSearched) {
      setSearchKeyword('');
      setHasSearched(true);
    }
  }, [hasSearched]);

  // Use searchQuery from filters if available, otherwise use local state
  const query = filters?.searchQuery || searchKeyword.trim();

  // Only fetch when search has been initiated
  const analytics = useKeywordAnalytics(query, filters, timePeriod, hasSearched);

  const handleSearch = (keyword: string) => {
    // Allow empty string to fetch all data
    if (onAppliedFiltersChange && filters) {
      // Update applied filters directly to trigger API calls
      onAppliedFiltersChange({ ...filters, searchQuery: keyword });
    } else if (onFiltersChange && filters) {
      // Fallback to draft filters if no applied filters handler
      onFiltersChange({ ...filters, searchQuery: keyword });
    } else {
      // Fallback to local state
      setSearchKeyword(keyword);
    }
    setHasSearched(true);
  };

  // Check if any request is loading (for search button state)
  const isSearching =
    analytics.getJobsPosted.isLoading ||
    analytics.getAverageClientHireRate.isLoading ||
    analytics.getAverageClientTotalSpent.isLoading ||
    analytics.getAverageHourlyRateBudget.isLoading ||
    analytics.getAverageFixedPriceBudget.isLoading ||
    analytics.getAveragePaidPerProject.isLoading ||
    analytics.getJobsCountLast3Months.isLoading ||
    analytics.getTop10CountriesByJobsPosted.isLoading ||
    analytics.getJobsByClientTotalSpent.isLoading ||
    analytics.getJobsByHourPosted.isLoading ||
    analytics.getJobsByDayOfWeek.isLoading ||
    analytics.getTop10Skills.isLoading ||
    analytics.getAverageHourlyRatePaidByCountry.isLoading ||
    analytics.getJobsByClientHireRate.isLoading ||
    analytics.getJobsByClientTotalJobsPosted.isLoading;

  // Transform API responses to match expected format
  const jobsPostedTrendData = transformJobsCountLast3Months(
    analytics.getJobsCountLast3Months.data
  );
  const jobsPostedResponse = analytics.getJobsPosted.data;
  
  // Parse jobsPosted response - handle string, number, or object formats
  let jobsPostedCount = 0;
  if (typeof jobsPostedResponse === 'number') {
    jobsPostedCount = jobsPostedResponse;
  } else if (typeof jobsPostedResponse === 'string') {
    // API returns string, convert to number
    jobsPostedCount = parseInt(jobsPostedResponse, 10) || 0;
  } else if (jobsPostedResponse) {
    // Try various possible object response formats
    jobsPostedCount = 
      (jobsPostedResponse as any)?.count ||
      (jobsPostedResponse as any)?.jobsPosted ||
      (jobsPostedResponse as any)?.data?.count ||
      (jobsPostedResponse as any)?.data?.jobsPosted ||
      (jobsPostedResponse as any)?.total ||
      0;
  }
  
  // Always prefer jobsPostedCount from the main API, only use trend data as fallback when data is not loaded
  const currentJobs = jobsPostedCount > 0 
    ? jobsPostedCount 
    : jobsPostedTrendData.length > 0
      ? jobsPostedTrendData[jobsPostedTrendData.length - 1].jobsPosted
      : 0;
      
  const previousJobs =
    jobsPostedTrendData.length > 1
      ? jobsPostedTrendData[jobsPostedTrendData.length - 2].jobsPosted
      : currentJobs;
  const jobsTrend =
    previousJobs > 0
      ? Number((((currentJobs - previousJobs) / previousJobs) * 100).toFixed(2))
      : 0;

  const topCountriesData = transformTopCountries(
    analytics.getTop10CountriesByJobsPosted.data
  );
  const clientSpentBreakdown = transformJobsByClientTotalSpent(
    analytics.getJobsByClientTotalSpent.data
  );
  const jobsByClientHireRate = transformJobsByClientHireRate(
    analytics.getJobsByClientHireRate.data
  );
  const jobsByClientTotalJobsPosted = transformJobsByClientTotalJobsPosted(
    analytics.getJobsByClientTotalJobsPosted.data
  );
  const jobsByHour = transformJobsByHour(analytics.getJobsByHourPosted.data);
  const jobsByDayOfWeek = transformJobsByDayOfWeek(
    analytics.getJobsByDayOfWeek.data
  );
  const mostSearchedSkills = transformTop10Skills(
    analytics.getTop10Skills.data
  );
  const averageHourlyRatePaidByCountry =
    transformAverageHourlyRatePaidByCountry(
      analytics.getAverageHourlyRatePaidByCountry.data
    );

  // Helper to extract average from response (could be number or object)
  const getAverage = (response: any): number => {
    if (response === null || response === undefined) {
      return 0;
    }

    let value = 0;

    // Handle number directly
    if (typeof response === 'number') {
      value = response;
    }
    // Handle string numbers
    else if (typeof response === 'string' && !isNaN(Number(response))) {
      value = Number(response);
    }
    // Handle object with average property
    else if (typeof response === 'object' && 'average' in response) {
      value = response.average;
    }
    // Handle object with other common property names
    else if (typeof response === 'object' && 'value' in response) {
      value = response.value;
    }
    // Handle object with data property (nested response)
    else if (typeof response === 'object' && 'data' in response) {
      return getAverage(response.data);
    }
    // Try to convert to number if it's a valid number
    else {
      const numValue = Number(response);
      value = isNaN(numValue) ? 0 : numValue;
    }

    return Number(value.toFixed(2));
  };

  const data = {
    jobsPosted: currentJobs,
    jobsPostedTrend: jobsTrend,
    jobsPostedTrendData:
      jobsPostedTrendData.length > 0 ? jobsPostedTrendData : [],
    topCountriesData,
    clientSpentBreakdown,
    jobsByClientHireRate,
    jobsByClientTotalJobsPosted,
    jobsByHour,
    jobsByDayOfWeek,
    mostSearchedSkills,
    avgClientHireRate: getAverage(analytics.getAverageClientHireRate.data),
    avgClientHireRateTrend: 0, // TODO: Calculate trend if needed
    avgClientTotalSpent: getAverage(analytics.getAverageClientTotalSpent.data),
    avgClientTotalSpentTrend: 0, // TODO: Calculate trend if needed
    avgHourlyBudget: getAverage(analytics.getAverageHourlyRateBudget.data),
    avgHourlyBudgetTrend: 0, // TODO: Calculate trend if needed
    avgFixedPrice: getAverage(analytics.getAverageFixedPriceBudget.data),
    avgFixedPriceTrend: 0, // TODO: Calculate trend if needed
    avgPaidPerProject: getAverage(analytics.getAveragePaidPerProject.data),
    avgPaidPerProjectTrend: 0, // TODO: Calculate trend if needed
  };

  return (
    <div className='space-y-8'>
      {/* Data Period Note */}
      

      {/* Search Input */}
      <div>
        <SearchInput
          onSearch={handleSearch}
          isSearching={isSearching}
          currentSearchKeyword={query}
          timePeriod={timePeriod}
          onTimePeriodChange={onTimePeriodChange}
          onOpenFilters={onOpenFilters}
        />
        {filters && onAppliedFiltersChange && (
          <FilterBadges
            filters={filters}
            onRemoveFilter={(filterKey, value) => {
              const newFilters = { ...filters };
              const keys = filterKey.split('.');
              let current: any = newFilters;

              // Navigate to the nested property
              for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
              }

              // Handle special cases
              if (filterKey === 'clientInfo.totalSpent') {
                current.minTotalSpent = null;
                current.maxTotalSpent = null;
              } else if (filterKey === 'clientInfo.avgHourlyRate') {
                current.minAvgHourlyRate = null;
                current.maxAvgHourlyRate = null;
              } else if (filterKey === 'clientInfo.hireRate') {
                current.minHireRate = null;
                current.maxHireRate = null;
              } else if (filterKey === 'payment.hourlyRate') {
                if (newFilters.payment) {
                  newFilters.payment.minHourlyRate = null;
                  newFilters.payment.maxHourlyRate = null;
                }
              } else if (filterKey === 'payment.fixedPrice') {
                if (newFilters.payment) {
                  newFilters.payment.minFixedPrice = null;
                  newFilters.payment.maxFixedPrice = null;
                }
              } else {
                // Remove the filter
                const lastKey = keys[keys.length - 1];
                if (Array.isArray(current[lastKey])) {
                  current[lastKey] = [];
                } else if (typeof current[lastKey] === 'string') {
                  current[lastKey] = '';
                } else if (typeof current[lastKey] === 'boolean') {
                  current[lastKey] = false;
                } else {
                  current[lastKey] = null;
                }
              }

              // Use onAppliedFiltersChange to directly update and trigger API calls
              onAppliedFiltersChange(newFilters);
            }}
            onClearAll={() => {
              // Use onAppliedFiltersChange to directly update and trigger API calls
              if (onAppliedFiltersChange) {
                onAppliedFiltersChange({
                  searchQuery: '',
                  keywords: null,
                  isFeatured: null,
                  regions: ['Worldwide', 'USOnly'],
                  categories: {
                    includes: [],
                    excludes: [],
                  },
                  experienceLevel: [],
                  engagementType: null,
                  vendorQualifications: null,
                  clientInfo: {
                    clientLocationIncludes: [],
                    clientLocationExcludes: [],
                    minTotalSpent: null,
                    maxTotalSpent: null,
                    minAvgHourlyRate: null,
                    maxAvgHourlyRate: null,
                    minHireRate: null,
                    maxHireRate: null,
                    minNumReviews: null,
                    minReviewScore: null,
                    maxReviewScore: null,
                    companySize: [],
                    clientIndustry: [],
                    minJobsPosted: null,
                    isPaymentVerified: 'all',
                    isPhoneVerified: 'all',
                    enterpriseClient: 'all',
                    memberSinceFrom: null,
                    memberSinceTo: null,
                  },
                  payment: {
                    paymentType: [],
                    minHourlyRate: null,
                    maxHourlyRate: null,
                    minFixedPrice: null,
                    maxFixedPrice: null,
                  },
                  projectDuration: [],
                  questions: {
                    hasQuestions: [],
                  },
                  totalSpentIncludeClientsWithLessThanXPostedJobs: null,
                  averageHourlyRateIncludeClientsWithLessThanXPostedJobs: null,
                  includeClientsWithLessThanXPostedJobs: null,
                  includeClientsWithZeroReviews: null,
                });
              }
            }}
          />
        )}
      </div>

      {/* Results - Progressive Loading */}
      {/* Metric Cards */}
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.6,
              },
            },
          },
        }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        <MetricCard
          icon={<TrendingUp className='w-6 h-6 text-[#D94C58]' />}
          label='Jobs Posted'
          value={data.jobsPosted}
          format='number'
          description='Total number of job postings found'
          isLoading={analytics.getJobsPosted.isLoading}
        />
        <MetricCard
          icon={<Users className='w-6 h-6 text-[#D94C58]' />}
          label='Avg. Client Hire Rate'
          value={data.avgClientHireRate}
          format='percentage'
          description='Percentage of clients who hire'
          isLoading={analytics.getAverageClientHireRate.isLoading}
        />
        <MetricCard
          icon={<DollarSign className='w-6 h-6 text-[#D94C58]' />}
          label='Avg. Client Total Spent'
          value={data.avgClientTotalSpent}
          format='currency'
          description='Average total amount spent by clients'
          isLoading={analytics.getAverageClientTotalSpent.isLoading}
        />
        <MetricCard
          icon={<Clock className='w-6 h-6 text-[#D94C58]' />}
          label='Avg. Hourly Rate Paid'
          value={data.avgHourlyBudget}
          format='hourly'
          description='Average hourly rate for this query'
          isLoading={analytics.getAverageHourlyRateBudget.isLoading}
        />
        <MetricCard
          icon={<Briefcase className='w-6 h-6 text-[#D94C58]' />}
          label='Avg. Fixed Price Budget'
          value={data.avgFixedPrice}
          format='currency'
          description='Average fixed price project budget'
          isLoading={analytics.getAverageFixedPriceBudget.isLoading}
        />
        <MetricCard
          icon={<DollarSign className='w-6 h-6 text-[#D94C58]' />}
          label='Avg. Paid Per Project'
          value={data.avgPaidPerProject}
          format='currency'
          description='Average amount paid per completed project'
          isLoading={analytics.getAveragePaidPerProject.isLoading}
        />
      </AnimatedGroup>

      {/* Divider */}
      <hr className='border-white/10 my-12' />

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
        {/* Trend Chart */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Jobs Posted Trend
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Historical trend showing job posting volume over time
          </p>
          {analytics.getJobsCountLast3Months.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[rgba(255,255,255,0.85)]'
                >
                  <LineChart
                    data={data.jobsPostedTrendData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='rgba(255, 255, 255, 0.1)'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='month'
                      angle={-45}
                      textAnchor='end'
                      height={50}
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 11,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ 
                        fill: 'rgba(255, 255, 255, 0.85)',
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                              <p className='text-white/70 text-xs mb-1'>{data.month}</p>
                              <p className='text-[#D94C58] font-bold text-lg'>
                                {Number(data.jobsPosted).toLocaleString()} jobs
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ stroke: '#D94C58', strokeWidth: 1 }}
                    />
                    <Line
                      type='monotone'
                      dataKey='jobsPosted'
                      stroke='#D94C58'
                      strokeWidth={3}
                      dot={{ fill: '#D94C58', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>

        {/* Top Countries Chart */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Globe className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 10 Countries by Jobs Posted
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Countries with the most job postings for this query
          </p>
          {analytics.getTop10CountriesByJobsPosted.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[rgba(255,255,255,0.85)]'
                >
                  <BarChart
                    data={data.topCountriesData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='rgba(255, 255, 255, 0.1)'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='country'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <YAxis
                      width={40}
                      tick={{ fill: 'rgba(255, 255, 255, 0.85)' }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                              <p className='text-white/70 text-xs mb-1'>{data.country}</p>
                              <p className='text-[#D94C58] font-bold text-lg'>
                                {Number(data.jobsPosted).toLocaleString()} jobs
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{
                        fill: 'rgba(217, 76, 88, 0.2)',
                        opacity: 0.3,
                      }}
                    />
                    <Bar
                      dataKey='jobsPosted'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Jobs Posted by Hour and Day of Week */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12'>
        {/* Jobs Posted by Hour of Day */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Clock className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Jobs Posted by Hour of Day{' '}
              <span className='text-white/50 '>(UTC)</span>
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Distribution of job postings throughout the day{' '}
          </p>
          {analytics.getJobsByHourPosted.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[rgba(255,255,255,0.85)]'
                >
                  <BarChart
                    data={data.jobsByHour}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='rgba(255, 255, 255, 0.1)'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='hour'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 11,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <YAxis
                      width={40}
                      tick={{ fill: 'rgba(255, 255, 255, 0.85)' }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                              <p className='text-white/70 text-xs mb-1'>{data.hour}</p>
                              <p className='text-[#D94C58] font-bold text-lg'>
                                {Number(data.jobsPosted).toLocaleString()} jobs
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{
                        fill: 'rgba(217, 76, 88, 0.2)',
                        opacity: 0.3,
                      }}
                    />
                    <Bar
                      dataKey='jobsPosted'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Posted by Day of Week */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Calendar className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Jobs Posted by Day of Week
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Distribution of job postings across the week
          </p>
          {analytics.getJobsByDayOfWeek.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[rgba(255,255,255,0.85)]'
                >
                  <BarChart
                    data={data.jobsByDayOfWeek}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='rgba(255, 255, 255, 0.1)'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='day'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <YAxis
                      width={40}
                      tick={{ fill: 'rgba(255, 255, 255, 0.85)' }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                              <p className='text-white/70 text-xs mb-1'>{data.day}</p>
                              <p className='text-[#D94C58] font-bold text-lg'>
                                {Number(data.jobsPosted).toLocaleString()} jobs
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{
                        fill: 'rgba(217, 76, 88, 0.2)',
                        opacity: 0.3,
                      }}
                    />
                    <Bar
                      dataKey='jobsPosted'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top 20 Countries by Hourly Rate Paid and Client Breakdown by Total Spent */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12'>
        {/* Average Hourly Rate Paid by Country */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Globe className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 20 Countries by Hourly Rate Paid
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average hourly rate actually paid by clients in each country
          </p>
          {analytics.getAverageHourlyRatePaidByCountry.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10'>
                <ChartContainer
                  config={{
                    avgHourlyRatePaid: {
                      label: 'Avg. Hourly Rate Paid',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[530px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[rgba(255,255,255,0.85)]'
                >
                  <BarChart
                    data={averageHourlyRatePaidByCountry}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='rgba(255, 255, 255, 0.1)'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='country'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ fill: 'rgba(255, 255, 255, 0.85)' }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickFormatter={(value) => `$${value}/hr`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                              <p className='text-white/70 text-xs mb-1'>{data.country}</p>
                              <p className='text-[#D94C58] font-bold text-lg'>
                                ${Number(data.avgHourlyRatePaid.toFixed(2))}/hr
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{
                        fill: 'rgba(217, 76, 88, 0.2)',
                        opacity: 0.3,
                      }}
                    />
                    <Bar
                      dataKey='avgHourlyRatePaid'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>

        {/* Client Breakdown by Total Spent */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Users className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Client Breakdown by Total Spent
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Distribution of clients across different total spent ranges
          </p>
          {analytics.getJobsByClientTotalSpent.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10 flex flex-col items-center justify-center gap-6'>
                {/* Pie Chart with Center Label */}
                <div className='relative flex-shrink-0'>
                  <ChartContainer
                    config={{
                      clients: {
                        label: 'Number of Clients',
                        color: '#D94C58',
                      },
                    }}
                    className='w-[300px] h-[300px] lg:w-[320px] lg:h-[320px]'
                  >
                    <PieChart>
                      <Pie
                        data={data.clientSpentBreakdown}
                        dataKey='clients'
                        nameKey='bucket'
                        cx='50%'
                        cy='50%'
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        cornerRadius={6}
                        stroke='none'
                      >
                        {data.clientSpentBreakdown.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                '#FF6B7A',
                                '#FF5268',
                                '#F94459',
                                '#D94C58',
                                '#C1424D',
                                '#AA3942',
                                '#932F37',
                                '#7C252C',
                                '#651B21',
                                '#4E1116',
                              ][index % 10]
                            }
                            strokeWidth={0}
                            className='transition-all duration-300 hover:opacity-80 cursor-pointer'
                            style={{
                              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                                <p className='text-white font-semibold text-sm'>{data.bucket}</p>
                                <p className='text-[#D94C58] font-bold text-lg'>
                                  {Number(data.clients).toLocaleString()} clients
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ChartContainer>
                  {/* Center Label */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                    <span className='text-3xl font-bold text-white'>
                      {data.clientSpentBreakdown.reduce((sum, item) => sum + item.clients, 0).toLocaleString()}
                    </span>
                    <span className='text-xs text-white/60 uppercase tracking-wider'>Total Clients</span>
                  </div>
                </div>

                {/* Legend */}
                <div className='w-full max-w-xs'>
                  <div className='space-y-2'>
                    {data.clientSpentBreakdown.map((item, index) => {
                      const total = data.clientSpentBreakdown.reduce((sum, i) => sum + i.clients, 0);
                      const percentage = total > 0 ? (item.clients / total) * 100 : 0;
                      const colors = [
                        '#FF6B7A',
                        '#FF5268',
                        '#F94459',
                        '#D94C58',
                        '#C1424D',
                        '#AA3942',
                        '#932F37',
                        '#7C252C',
                        '#651B21',
                        '#4E1116',
                      ];
                      const color = colors[index % 10];
                      
                      return (
                        <div key={index} className='group cursor-pointer'>
                          <div className='flex items-center justify-between mb-1'>
                            <div className='flex items-center gap-2'>
                              <div 
                                className='w-2.5 h-2.5 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-125'
                                style={{ backgroundColor: color }}
                              />
                              <span className='text-white/80 text-xs font-medium group-hover:text-white transition-colors'>
                                {item.bucket}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-white/50 text-xs'>
                                {percentage.toFixed(1)}%
                              </span>
                              <span className='text-white font-semibold text-xs min-w-[50px] text-right'>
                                {item.clients.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className='h-1 bg-white/10 rounded-full overflow-hidden'>
                            <div 
                              className='h-full rounded-full transition-all duration-500 ease-out'
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: color,
                                boxShadow: `0 0 8px ${color}40`
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client Breakdown by Hire Rate and Total Jobs Posted */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12'>
        {/* Jobs by Client Hire Rate */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Users className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Client Breakdown by Hire Rate
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Distribution of clients across different hire rate ranges
          </p>
          {analytics.getJobsByClientHireRate.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10 flex flex-col items-center justify-center gap-6'>
                {/* Pie Chart with Center Label */}
                <div className='relative flex-shrink-0'>
                  <ChartContainer
                    config={{
                      clients: {
                        label: 'Number of Clients',
                        color: '#D94C58',
                      },
                    }}
                    className='w-[300px] h-[300px] lg:w-[320px] lg:h-[320px]'
                  >
                    <PieChart>
                      <Pie
                        data={data.jobsByClientHireRate}
                        dataKey='clients'
                        nameKey='bucket'
                        cx='50%'
                        cy='50%'
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        cornerRadius={6}
                        stroke='none'
                      >
                        {data.jobsByClientHireRate.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                '#FF6B7A',
                                '#FF5268',
                                '#F94459',
                                '#D94C58',
                                '#C1424D',
                                '#AA3942',
                                '#932F37',
                                '#7C252C',
                                '#651B21',
                                '#4E1116',
                              ][index % 10]
                            }
                            strokeWidth={0}
                            className='transition-all duration-300 hover:opacity-80 cursor-pointer'
                            style={{
                              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                                <p className='text-white font-semibold text-sm'>{data.bucket}</p>
                                <p className='text-[#D94C58] font-bold text-lg'>
                                  {Number(data.clients).toLocaleString()} clients
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ChartContainer>
                  {/* Center Label */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                    <span className='text-3xl font-bold text-white'>
                      {data.jobsByClientHireRate.reduce((sum, item) => sum + item.clients, 0).toLocaleString()}
                    </span>
                    <span className='text-xs text-white/60 uppercase tracking-wider'>Total Clients</span>
                  </div>
                </div>

                {/* Legend */}
                <div className='w-full max-w-xs'>
                  <div className='space-y-2'>
                    {data.jobsByClientHireRate.map((item, index) => {
                      const total = data.jobsByClientHireRate.reduce((sum, i) => sum + i.clients, 0);
                      const percentage = total > 0 ? (item.clients / total) * 100 : 0;
                      const colors = [
                        '#FF6B7A',
                        '#FF5268',
                        '#F94459',
                        '#D94C58',
                        '#C1424D',
                        '#AA3942',
                        '#932F37',
                        '#7C252C',
                        '#651B21',
                        '#4E1116',
                      ];
                      const color = colors[index % 10];
                      
                      return (
                        <div key={index} className='group cursor-pointer'>
                          <div className='flex items-center justify-between mb-1'>
                            <div className='flex items-center gap-2'>
                              <div 
                                className='w-2.5 h-2.5 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-125'
                                style={{ backgroundColor: color }}
                              />
                              <span className='text-white/80 text-xs font-medium group-hover:text-white transition-colors'>
                                {item.bucket}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-white/50 text-xs'>
                                {percentage.toFixed(1)}%
                              </span>
                              <span className='text-white font-semibold text-xs min-w-[50px] text-right'>
                                {item.clients.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className='h-1 bg-white/10 rounded-full overflow-hidden'>
                            <div 
                              className='h-full rounded-full transition-all duration-500 ease-out'
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: color,
                                boxShadow: `0 0 8px ${color}40`
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jobs by Client Total Jobs Posted */}
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Users className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Client Breakdown by Total Jobs Posted
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Distribution of clients across different total jobs posted ranges
          </p>
          {analytics.getJobsByClientTotalJobsPosted.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10 flex flex-col items-center justify-center gap-6'>
                {/* Pie Chart with Center Label */}
                <div className='relative flex-shrink-0'>
                  <ChartContainer
                    config={{
                      clients: {
                        label: 'Number of Clients',
                        color: '#D94C58',
                      },
                    }}
                    className='w-[300px] h-[300px] lg:w-[320px] lg:h-[320px]'
                  >
                    <PieChart>
                      <Pie
                        data={data.jobsByClientTotalJobsPosted}
                        dataKey='clients'
                        nameKey='bucket'
                        cx='50%'
                        cy='50%'
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        cornerRadius={6}
                        stroke='none'
                      >
                        {data.jobsByClientTotalJobsPosted.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                '#FF6B7A',
                                '#FF5268',
                                '#F94459',
                                '#D94C58',
                                '#C1424D',
                                '#AA3942',
                                '#932F37',
                                '#7C252C',
                                '#651B21',
                                '#4E1116',
                              ][index % 10]
                            }
                            strokeWidth={0}
                            className='transition-all duration-300 hover:opacity-80 cursor-pointer'
                            style={{
                              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                                <p className='text-white font-semibold text-sm'>{data.bucket}</p>
                                <p className='text-[#D94C58] font-bold text-lg'>
                                  {Number(data.clients).toLocaleString()} clients
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ChartContainer>
                  {/* Center Label */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                    <span className='text-3xl font-bold text-white'>
                      {data.jobsByClientTotalJobsPosted.reduce((sum, item) => sum + item.clients, 0).toLocaleString()}
                    </span>
                    <span className='text-xs text-white/60 uppercase tracking-wider'>Total Clients</span>
                  </div>
                </div>

                {/* Legend */}
                <div className='w-full max-w-xs'>
                  <div className='space-y-2'>
                    {data.jobsByClientTotalJobsPosted.map((item, index) => {
                      const total = data.jobsByClientTotalJobsPosted.reduce((sum, i) => sum + i.clients, 0);
                      const percentage = total > 0 ? (item.clients / total) * 100 : 0;
                      const colors = [
                        '#FF6B7A',
                        '#FF5268',
                        '#F94459',
                        '#D94C58',
                        '#C1424D',
                        '#AA3942',
                        '#932F37',
                        '#7C252C',
                        '#651B21',
                        '#4E1116',
                      ];
                      const color = colors[index % 10];
                      
                      return (
                        <div key={index} className='group cursor-pointer'>
                          <div className='flex items-center justify-between mb-1'>
                            <div className='flex items-center gap-2'>
                              <div 
                                className='w-2.5 h-2.5 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-125'
                                style={{ backgroundColor: color }}
                              />
                              <span className='text-white/80 text-xs font-medium group-hover:text-white transition-colors'>
                                {item.bucket}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-white/50 text-xs'>
                                {percentage.toFixed(1)}%
                              </span>
                              <span className='text-white font-semibold text-xs min-w-[50px] text-right'>
                                {item.clients.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className='h-1 bg-white/10 rounded-full overflow-hidden'>
                            <div 
                              className='h-full rounded-full transition-all duration-500 ease-out'
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: color,
                                boxShadow: `0 0 8px ${color}40`
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Most Searched Skills - Full Width */}
      <div className='max-w-6xl mx-auto mt-12'>
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Most Searched Skills
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Top 20 most frequently searched skills in job postings
          </p>
          {analytics.getTop10Skills.isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className='relative rounded-2xl bg-[#161616] border border-white/10 p-6 shadow-2xl overflow-hidden'>
              {/* Subtle background glow */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#D94C58]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#D94C58]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
              
              <div className='relative z-10'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[500px] max-h-[500px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-[rgba(255,255,255,0.85)]'
                >
                  <BarChart
                    data={data.mostSearchedSkills}
                    layout='vertical'
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='rgba(255, 255, 255, 0.1)'
                      opacity={0.5}
                    />
                    <XAxis
                      type='number'
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    />
                    <YAxis
                      type='category'
                      dataKey='skill'
                      width={150}
                      tick={{
                        fill: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      interval={0}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className='bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 shadow-xl'>
                              <p className='text-white/70 text-xs mb-1'>{data.skillFull || data.skill}</p>
                              <p className='text-[#D94C58] font-bold text-lg'>
                                {Number(data.jobsPosted).toLocaleString()} jobs
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{
                        fill: 'rgba(217, 76, 88, 0.2)',
                        opacity: 0.3,
                      }}
                    />
                    <Bar
                      dataKey='jobsPosted'
                      fill='#D94C58'
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
