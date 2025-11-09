'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import {
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import {
  avgHourlyBudgetConfig,
  avgHourlyBudgetData,
  avgJobsPostedByCountryData,
  avgJobsPostedConfig,
  avgPaidPerProjectConfig,
  avgPaidPerProjectData,
  avgSpentConfig,
  avgSpentData,
  hireRateConfig,
  hireRateData,
  jobsPostedConfig,
  jobsPostedData,
} from './data';
import { MonthFilter } from './month-filter';
import { getPastThreeMonths } from './utils';

export function CountryCharts() {
  const monthOptions = getPastThreeMonths();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value); // Default to "Past 3 Months"

  return (
    <div className='space-y-16'>
      {/* Month Filter */}
      <div className='flex justify-center'>
        <MonthFilter value={selectedMonth} onValueChange={setSelectedMonth} />
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
              Jobs Posted by Client Country
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Total number of job postings from each country
          </p>
          <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardContent className='p-4'>
              <ChartContainer
                config={jobsPostedConfig}
                className='min-h-[400px] w-full'
              >
                <BarChart
                  data={jobsPostedData}
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
                    tick={{ fill: '#6b7280', fontSize: 12 }}
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
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <DollarSign className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Avg. Client Total Spent by Country
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average total amount clients have spent on freelancers historically
          </p>
          <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardContent className='p-4'>
              <ChartContainer
                config={avgSpentConfig}
                className='min-h-[400px] w-full'
              >
                <BarChart
                  data={avgSpentData}
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
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    width={50}
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    content={<ChartTooltipContent />}
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
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Users className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Client Hire Rate by Country
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Percentage of job postings that result in a hire
          </p>
          <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardContent className='p-4'>
              <ChartContainer
                config={hireRateConfig}
                className='min-h-[400px] w-full'
              >
                <BarChart
                  data={hireRateData}
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
                    content={<ChartTooltipContent />}
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
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Clock className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Avg. Hourly Budget by Country
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average hourly rate clients are willing to pay
          </p>
          <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardContent className='p-4'>
              <ChartContainer
                config={avgHourlyBudgetConfig}
                className='min-h-[400px] w-full'
              >
                <BarChart
                  data={avgHourlyBudgetData}
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
                    tick={{ fill: '#6b7280', fontSize: 12 }}
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
                    content={<ChartTooltipContent />}
                    cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
                  />
                  <Bar
                    dataKey='avgHourlyBudget'
                    fill='#D94C58'
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Briefcase className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Avg. Paid Per Project by Country
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Average amount paid per completed project
          </p>
          <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardContent className='p-4'>
              <ChartContainer
                config={avgPaidPerProjectConfig}
                className='min-h-[400px] w-full'
              >
                <BarChart
                  data={avgPaidPerProjectData}
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
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    width={50}
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                  />
                  <Tooltip
                    content={<ChartTooltipContent />}
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
        </div>

        <div>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <FileText className='w-5 h-5 text-[#D94C58]' />
            <h2 className='text-2xl font-bold text-white text-center'>
              Avg. Client Jobs Posted by Country
            </h2>
          </div>
          <p className='text-center text-white/70 mb-6 text-sm'>
            Higher numbers indicate experienced clients with proven hiring
            history
          </p>
          <Card className='bg-white border-border/50 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <CardContent className='p-4'>
              <ChartContainer
                config={avgJobsPostedConfig}
                className='min-h-[400px] w-full'
              >
                <BarChart
                  data={avgJobsPostedByCountryData}
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
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    width={50}
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <Tooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
                  />
                  <Bar
                    dataKey='avgJobsPosted'
                    fill='#D94C58'
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </AnimatedGroup>
    </div>
  );
}
