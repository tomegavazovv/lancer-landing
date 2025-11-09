'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Clock,
  DollarSign,
  Globe,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
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
import { MonthFilter } from './month-filter';
import { getPastThreeMonths } from './utils';

// Mock trend data - will be replaced with real data later
const getJobsPostedTrend = (keyword: string) => {
  // Generate mock data for past 3 months
  const now = new Date();
  const months = [];
  for (let i = 2; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      jobsPosted: Math.floor(Math.random() * 200) + 350 + i * 50, // Increasing trend
    });
  }
  return months;
};

// Mock data - will be replaced with real data later
const getKeywordData = (keyword: string) => {
  // For now, return the same mock data regardless of keyword
  const trendData = getJobsPostedTrend(keyword);
  const currentJobs = trendData[trendData.length - 1].jobsPosted;
  const previousJobs = trendData[trendData.length - 2].jobsPosted;
  const jobsTrend = ((currentJobs - previousJobs) / previousJobs) * 100;

  // Top 10 countries with jobs posted
  const topCountriesData = [
    { country: 'USA', jobsPosted: 245 },
    { country: 'Germany', jobsPosted: 198 },
    { country: 'Brazil', jobsPosted: 189 },
    { country: 'Canada', jobsPosted: 182 },
    { country: 'UK', jobsPosted: 167 },
    { country: 'Spain', jobsPosted: 156 },
    { country: 'Australia', jobsPosted: 142 },
    { country: 'France', jobsPosted: 134 },
    { country: 'Italy', jobsPosted: 123 },
    { country: 'Netherlands', jobsPosted: 98 },
  ];

  return {
    jobsPosted: currentJobs,
    jobsPostedTrend: jobsTrend,
    jobsPostedTrendData: trendData,
    topCountriesData,
    avgClientHireRate: 62.5,
    avgClientHireRateTrend: 5.2,
    avgClientTotalSpent: 12450,
    avgClientTotalSpentTrend: -2.1,
    avgHourlyBudget: 78,
    avgHourlyBudgetTrend: 3.8,
    avgFixedPrice: 5200,
    avgFixedPriceTrend: 1.5,
    avgPaidPerProject: 4850,
    avgPaidPerProjectTrend: 4.2,
  };
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  format?: 'number' | 'currency' | 'percentage' | 'hourly';
  description?: string;
  trend?: number; // Percentage change
}

function MetricCard({
  icon,
  label,
  value,
  format = 'number',
  description,
  trend,
}: MetricCardProps) {
  const formatValue = () => {
    if (format === 'currency') {
      if (typeof value === 'number') {
        if (value >= 1000) {
          return `$${(value / 1000).toFixed(1)}k`;
        }
        return `$${value.toFixed(0)}`;
      }
      return value;
    }
    if (format === 'hourly') {
      if (typeof value === 'number') {
        return `$${value.toFixed(0)}/hr`;
      }
      return value;
    }
    if (format === 'percentage') {
      return `${value}%`;
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
              {Math.abs(trend).toFixed(1)}%
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

export function KeywordBreakdown() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const monthOptions = getPastThreeMonths();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value); // Default to "Past 3 Months"

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      setSearchKeyword(keyword.trim());
      setIsSearching(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Show data for empty query (default) or for the searched query
  const data = getKeywordData(searchKeyword);

  return (
    <div className='space-y-8'>
      {/* Month Filter */}
      <div className='flex justify-center'>
        <MonthFilter value={selectedMonth} onValueChange={setSelectedMonth} />
      </div>

      {/* Search Input */}
      <div className='max-w-2xl mx-auto'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <Input
            type='text'
            placeholder='Enter query to analyze (e.g., "React developer", "Logo design")'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className='pl-12 pr-32 h-14 text-lg bg-white/95 border-white/20 text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#D94C58]'
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-[#D94C58] text-white rounded-md font-medium hover:bg-[#c43d48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchKeyword && (
          <p className='mt-4 text-center text-white/80'>
            Showing results for:{' '}
            <span className='font-semibold text-white'>{searchKeyword}</span>
          </p>
        )}
        {!searchKeyword && (
          <p className='mt-4 text-center text-white/80'>
            Showing results for:{' '}
            <span className='font-semibold text-white'>all queries</span>
          </p>
        )}
      </div>

      {/* Results */}
      {data && (
        <>
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
            />
            <MetricCard
              icon={<Users className='w-6 h-6 text-[#D94C58]' />}
              label='Avg. Client Hire Rate'
              value={data.avgClientHireRate}
              format='percentage'
              description='Percentage of clients who hire'
            />
            <MetricCard
              icon={<DollarSign className='w-6 h-6 text-[#D94C58]' />}
              label='Avg. Client Total Spent'
              value={data.avgClientTotalSpent}
              format='currency'
              description='Average total amount spent by clients'
            />
            <MetricCard
              icon={<Clock className='w-6 h-6 text-[#D94C58]' />}
              label='Avg. Hourly Budget'
              value={data.avgHourlyBudget}
              format='hourly'
              description='Average hourly rate for this query'
            />
            <MetricCard
              icon={<Briefcase className='w-6 h-6 text-[#D94C58]' />}
              label='Avg. Fixed Price'
              value={data.avgFixedPrice}
              format='currency'
              description='Average fixed price project budget'
            />
            <MetricCard
              icon={<DollarSign className='w-6 h-6 text-[#D94C58]' />}
              label='Avg. Paid Per Project'
              value={data.avgPaidPerProject}
              format='currency'
              description='Average amount paid per completed project'
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
                      />
                      <Tooltip
                        content={<ChartTooltipContent />}
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
            </div>

            {/* Top Countries Chart */}
            <div>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Globe className='w-5 h-5 text-[#D94C58]' />
                <h2 className='text-2xl font-bold text-white text-center'>
                  Top 10 Countries
                </h2>
              </div>
              <p className='text-center text-white/70 mb-6 text-sm'>
                Countries with the most job postings for this query
              </p>
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
                      />
                      <Tooltip
                        content={<ChartTooltipContent />}
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}
