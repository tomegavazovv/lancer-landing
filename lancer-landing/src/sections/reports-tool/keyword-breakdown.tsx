'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { useKeywordAnalytics } from '@/hooks/use-upwork-analytics';
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import AdvancedSearchDialog from './advanced-search-dialog';

// Helper function to transform API response data
const transformJobsCountLast3Months = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    month: item.month || '',
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
    <Card className='bg-white/5 border-white/10 shadow-lg'>
      <CardContent className='p-6'>
        <div className='flex items-start justify-between mb-4'>
          <div className='p-3 rounded-lg bg-white/10 animate-pulse w-12 h-12'></div>
          <div className='w-16 h-6 bg-white/10 rounded-md animate-pulse'></div>
        </div>
        <div className='space-y-1'>
          <div className='h-4 bg-white/10 rounded w-32 animate-pulse mb-2'></div>
          <div className='h-8 bg-white/10 rounded w-24 animate-pulse'></div>
          <div className='h-3 bg-white/10 rounded w-40 animate-pulse mt-2'></div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartSkeleton() {
  // Generate random bar heights for a more realistic look
  const barHeights = [65, 85, 45, 75, 55, 90, 40, 70, 50, 80];

  return (
    <Card className='bg-white border-border/50 p-0 shadow-lg'>
      <CardContent className='p-4'>
        <div className='min-h-[300px] w-full relative overflow-hidden'>
          {/* Loading overlay */}
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-3'>
              <div className='relative'>
                <div className='h-8 w-8 border-4 border-[#D94C58]/20 rounded-full'></div>
                <div className='h-8 w-8 border-4 border-transparent border-t-[#D94C58] rounded-full animate-spin absolute top-0 left-0'></div>
              </div>
              <p className='text-sm font-medium text-gray-600 animate-pulse'>
                Loading chart data...
              </p>
            </div>
          </div>

          {/* Grid lines */}
          <div className='absolute inset-0 flex flex-col justify-between py-4 px-12'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='border-t border-dashed border-gray-200/40'
                style={{ marginTop: i === 0 ? '0' : 'auto' }}
              />
            ))}
          </div>

          {/* Y-axis labels */}
          <div className='absolute left-2 top-0 bottom-10 flex flex-col justify-between py-4'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='h-3 w-10 bg-gray-200/30 rounded-sm animate-pulse'
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
                  className='h-2.5 w-10 bg-gray-200/30 rounded-sm animate-pulse'
                  style={{
                    animationDelay: `${i * 0.1 + 0.05}s`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
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
    <Card className='bg-white/5 border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]'>
      <CardContent className='p-6'>
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
      </CardContent>
    </Card>
  );
}

interface SearchInputProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  currentSearchKeyword: string;
}

function SearchInput({
  onSearch,
  isSearching,
  currentSearchKeyword,
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
    <div className='max-w-2xl mx-auto'>
      <div className='relative'>
        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
        <Input
          type='text'
          placeholder='Enter query to analyze (e.g., "React developer", "Logo design")'
          value={displayValue || ''}
          readOnly
          onClick={handleInputClick}
          disabled={isSearching}
          className='pl-12 pr-32 h-14 text-lg bg-white/95 border-white/20 text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#D94C58] cursor-pointer hover:bg-white transition-colors disabled:cursor-not-allowed disabled:opacity-50'
        />
        <button
          onClick={handleButtonClick}
          disabled={isSearching}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-[#D94C58] text-white rounded-md font-medium hover:bg-[#c43d48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      <p className='mt-4 text-center text-white/80'>
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

export function KeywordBreakdown() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Automatically trigger search with empty query when component mounts
  useEffect(() => {
    if (!hasSearched) {
      setSearchKeyword('');
      setHasSearched(true);
    }
  }, [hasSearched]);

  // Only fetch when search has been initiated
  const analytics = useKeywordAnalytics(searchKeyword.trim(), hasSearched);

  const handleSearch = (keyword: string) => {
    // Allow empty string to fetch all data
    setSearchKeyword(keyword);
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
    analytics.getAverageHourlyRatePaidByCountry.isLoading;

  // Transform API responses to match expected format
  const jobsPostedTrendData = transformJobsCountLast3Months(
    analytics.getJobsCountLast3Months.data
  );
  const jobsPostedResponse = analytics.getJobsPosted.data;
  const jobsPostedCount =
    typeof jobsPostedResponse === 'number'
      ? jobsPostedResponse
      : (jobsPostedResponse as any)?.count ||
        (jobsPostedResponse as any)?.jobsPosted ||
        0;
  const currentJobs =
    jobsPostedTrendData.length > 0
      ? jobsPostedTrendData[jobsPostedTrendData.length - 1].jobsPosted
      : jobsPostedCount;
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
    jobsPosted: jobsPostedCount || currentJobs,
    jobsPostedTrend: jobsTrend,
    jobsPostedTrendData:
      jobsPostedTrendData.length > 0 ? jobsPostedTrendData : [],
    topCountriesData,
    clientSpentBreakdown,
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
      <div className='flex justify-center'>
        <div className='flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20'>
          <Calendar className='w-4 h-4 text-white/90' />
          <p className='text-base font-semibold text-white/90'>
            Data shown is from the past 30 days
          </p>
        </div>
      </div>

      {/* Search Input */}
      <SearchInput
        onSearch={handleSearch}
        isSearching={isSearching}
        currentSearchKeyword={searchKeyword}
      />

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
              Jobs Posted Trend (Past 3 Months)
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Historical trend showing job posting volume over time
          </p>
          {analytics.getJobsCountLast3Months.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full'
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
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='month'
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
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
              </CardContent>
            </Card>
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
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full'
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
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='country'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={40}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{
                        fill: '#f3f4f6',
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Average Hourly Rate Paid by Country and Client Breakdown */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12'>
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
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    avgHourlyRatePaid: {
                      label: 'Avg. Hourly Rate Paid',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[400px] w-full'
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
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='country'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `$${value}/hr`}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return `$${Number(value.toFixed(2))}/hr`;
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{
                        fill: '#f3f4f6',
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
              </CardContent>
            </Card>
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
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    clients: {
                      label: 'Number of Clients',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[400px] w-full'
                >
                  <BarChart
                    data={data.clientSpentBreakdown}
                    layout='vertical'
                    margin={{
                      top: 10,
                      right: 10,
                      left: 10,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      type='number'
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      type='category'
                      dataKey='bucket'
                      width={80}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{
                        fill: '#f3f4f6',
                        opacity: 0.3,
                      }}
                    />
                    <Bar
                      dataKey='clients'
                      fill='#D94C58'
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
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
              Jobs Posted by Hour of Day
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Distribution of job postings throughout the day
          </p>
          {analytics.getJobsByHourPosted.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full'
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
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='hour'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 11,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={40}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{
                        fill: '#f3f4f6',
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
              </CardContent>
            </Card>
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
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[300px] w-full'
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
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey='day'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={40}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{
                        fill: '#f3f4f6',
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
              </CardContent>
            </Card>
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
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={{
                    jobsPosted: {
                      label: 'Jobs Posted',
                      color: '#D94C58',
                    },
                  }}
                  className='min-h-[400px] w-full'
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
                      stroke='#e5e7eb'
                      opacity={0.5}
                    />
                    <XAxis
                      type='number'
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      type='category'
                      dataKey='skill'
                      width={150}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12,
                      }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      interval={0}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label, payload) => {
                            // Use the full skill name from the payload data
                            if (payload && payload[0] && payload[0].payload) {
                              return payload[0].payload.skillFull || label;
                            }
                            return label;
                          }}
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{
                        fill: '#f3f4f6',
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
