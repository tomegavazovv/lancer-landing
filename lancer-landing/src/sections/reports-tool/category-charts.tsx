'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useCategoryAnalytics } from '@/hooks/use-upwork-analytics';
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import {
  avgHourlyBudgetConfig,
  avgPaidPerProjectConfig,
  avgSpentConfig,
  hireRateConfig,
  jobsPostedConfig,
  truncateCategory,
} from './data';

// Helper functions to transform API responses
const transformTop10Categories = (data: any) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    category: item.category || '',
    categoryDisplay: truncateCategory(item.category || ''),
    jobsPosted: item.count || item.jobsPosted || 0,
    avgSpent: item.average || item.avgSpent || 0,
    hireRate: item.average || item.hireRate || 0,
    avgHourlyBudget: item.average || item.avgHourlyBudget || 0,
    avgPaidPerProject: item.average || item.avgPaidPerProject || 0,
    avgJobsPosted: item.average || item.avgJobsPosted || 0,
  }));
};

function ChartSkeleton() {
  // Generate random bar heights for a more realistic look
  const barHeights = [65, 85, 45, 75, 55, 90, 40, 70, 50, 80];

  return (
    <Card className='bg-white border-border/50 p-0 shadow-lg'>
      <CardContent className='p-4'>
        <div className='min-h-[400px] w-full relative overflow-hidden'>
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

export function CategoryCharts() {
  const analytics = useCategoryAnalytics();

  // Removed blocking isLoading check - each chart handles its own loading state

  // Transform API responses - handle actual API response format
  const transformCategoryData = (data: any, valueKey: string) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item: any) => {
      // For avgSpent, check totalSpent first since that's what the API returns
      let value = item[valueKey];
      if (valueKey === 'avgSpent') {
        value = item.totalSpent || item.avgSpent || item.average || 0;
      } else {
        value =
          item[valueKey] || item.average || item.count || item.jobsPosted || 0;
      }
      // Round numeric values to 2 decimals
      const roundedValue =
        typeof value === 'number' ? Number(value.toFixed(2)) : value;
      return {
        category: item.category || '',
        categoryDisplay: truncateCategory(item.category || ''),
        [valueKey]: roundedValue,
      };
    });
  };

  const jobsPostedByCategoryData = transformCategoryData(
    analytics.getTop10CategoriesByJobsPosted.data,
    'jobsPosted'
  );
  const avgSpentByCategoryData = transformCategoryData(
    analytics.getTop10CategoriesByClientTotalSpent.data,
    'avgSpent'
  );
  const hireRateByCategoryData = transformCategoryData(
    analytics.getTop10CategoriesByClientHireRate.data,
    'hireRate'
  );
  const avgPaidPerProjectByCategoryData = transformCategoryData(
    analytics.getTop10CategoriesByAvgPaidPerProject.data,
    'avgPaidPerProject'
  );
  // Note: avgJobsPostedByCategoryData would need a separate endpoint or calculation
  const avgJobsPostedByCategoryData = jobsPostedByCategoryData.map((item) => ({
    category: item.category,
    categoryDisplay: item.categoryDisplay,
    avgJobsPosted: item.avgJobsPosted || 0,
  }));

  // Transform data for Top 20 by Hourly Rate Paid (similar to country chart)
  const transformTop20CategoriesByHourlyRate = (data: any) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item: any) => {
      const categoryName = item.category || '';
      const truncatedCategory = truncateCategory(categoryName, 20);
      const value =
        item.average || item.avgHourlyRatePaid || item.avgHourlyBudget || 0;
      // Round numeric values to 2 decimals
      const roundedValue =
        typeof value === 'number' ? Number(value.toFixed(2)) : value;
      return {
        category: truncatedCategory,
        categoryFull: categoryName, // Store full name for tooltip
        avgHourlyRatePaid: roundedValue,
      };
    });
  };

  const top20CategoriesByHourlyRateData = transformTop20CategoriesByHourlyRate(
    analytics.getTop20CategoriesByAvgHourlyRatePaid.data
  );

  return (
    <div className='space-y-16'>
      {/* Data Period Note */}
      <div className='flex justify-center'>
        <div className='flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20'>
          <Calendar className='w-4 h-4 text-white/90' />
          <p className='text-base font-semibold text-white/90'>
            Data shown is from the past 30 days
          </p>
        </div>
      </div>

      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.8,
              },
            },
          },
        }}
        className='grid grid-cols-1 lg:grid-cols-2 gap-12'
      >
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 10 by Jobs Posted
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Total number of job postings in each category
          </p>
          {analytics.getTop10CategoriesByJobsPosted.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={jobsPostedConfig}
                  className='min-h-[400px] w-full'
                >
                  <BarChart
                    data={
                      jobsPostedByCategoryData.length > 0
                        ? jobsPostedByCategoryData
                        : []
                    }
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
                      dataKey='categoryDisplay'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
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
                          labelFormatter={(value, payload) => {
                            if (payload && payload[0]?.payload?.category) {
                              return payload[0].payload.category;
                            }
                            return value;
                          }}
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
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

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <DollarSign className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 10 by Client Total Spent
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average total amount clients have spent on freelancers
          </p>
          {analytics.getTop10CategoriesByClientTotalSpent.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={avgSpentConfig}
                  className='min-h-[400px] w-full'
                >
                  <BarChart
                    data={
                      avgSpentByCategoryData.length > 0
                        ? avgSpentByCategoryData
                        : []
                    }
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
                      dataKey='categoryDisplay'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value, payload) => {
                            if (payload && payload[0]?.payload?.category) {
                              return payload[0].payload.category;
                            }
                            return value;
                          }}
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
                    />
                    <Bar
                      dataKey='avgSpent'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Users className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 10 by Client Hire Rate
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Percentage of job postings that result in a hire
          </p>
          {analytics.getTop10CategoriesByClientHireRate.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={hireRateConfig}
                  className='min-h-[400px] w-full'
                >
                  <BarChart
                    data={
                      hireRateByCategoryData.length > 0
                        ? hireRateByCategoryData
                        : []
                    }
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
                      dataKey='categoryDisplay'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value, payload) => {
                            if (payload && payload[0]?.payload?.category) {
                              return payload[0].payload.category;
                            }
                            return value;
                          }}
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
                    />
                    <Bar
                      dataKey='hireRate'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Briefcase className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 10 by Paid Per Project
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average amount paid per completed project
          </p>
          {analytics.getTop10CategoriesByAvgPaidPerProject.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={avgPaidPerProjectConfig}
                  className='min-h-[400px] w-full'
                >
                  <BarChart
                    data={
                      avgPaidPerProjectByCategoryData.length > 0
                        ? avgPaidPerProjectByCategoryData
                        : []
                    }
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
                      dataKey='categoryDisplay'
                      angle={-45}
                      textAnchor='end'
                      height={40}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      width={50}
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(1)}k`
                      }
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value, payload) => {
                            if (payload && payload[0]?.payload?.category) {
                              return payload[0].payload.category;
                            }
                            return value;
                          }}
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return Number(value.toFixed(2)).toLocaleString();
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
                    />
                    <Bar
                      dataKey='avgPaidPerProject'
                      fill='#D94C58'
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
        </div>
      </AnimatedGroup>

      {/* Top 20 by Hourly Rate Paid - Full Width Horizontal Chart */}
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.8,
              },
            },
          },
        }}
        className='max-w-6xl mx-auto'
      >
        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Clock className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Top 20 by Hourly Rate Paid
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average hourly rate paid by clients
          </p>
          {analytics.getTop20CategoriesByAvgHourlyRatePaid.isLoading ? (
            <ChartSkeleton />
          ) : (
            <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <CardContent className='p-4'>
                <ChartContainer
                  config={avgHourlyBudgetConfig}
                  className='h-[450px] w-full'
                >
                  <BarChart
                    data={
                      top20CategoriesByHourlyRateData.length > 0
                        ? top20CategoriesByHourlyRateData
                        : []
                    }
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
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `$${value}/hr`}
                    />
                    <YAxis
                      type='category'
                      dataKey='category'
                      width={150}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      interval={0}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label, payload) => {
                            // Use the full category name from the payload data
                            if (payload && payload[0] && payload[0].payload) {
                              return payload[0].payload.categoryFull || label;
                            }
                            return label;
                          }}
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return `$${Number(value.toFixed(2))}/hr`;
                            }
                            return value;
                          }}
                        />
                      }
                      cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
                    />
                    <Bar
                      dataKey='avgHourlyRatePaid'
                      fill='#D94C58'
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
        </div>
      </AnimatedGroup>
    </div>
  );
}
