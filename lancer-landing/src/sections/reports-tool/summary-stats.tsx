'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import {
  avgHourlyBudgetData,
  avgSpentData,
  hireRateData,
  jobsPostedData,
} from './data';

export function SummaryStats() {
  // Calculate summary statistics
  const totalJobs = jobsPostedData.reduce(
    (sum, item) => sum + item.jobsPosted,
    0
  );
  const avgSpent = Math.round(
    avgSpentData.reduce((sum, item) => sum + item.avgSpent, 0) /
      avgSpentData.length
  );
  const avgHireRate = Math.round(
    hireRateData.reduce((sum, item) => sum + item.hireRate, 0) /
      hireRateData.length
  );
  const avgHourly = Math.round(
    avgHourlyBudgetData.reduce((sum, item) => sum + item.avgHourlyBudget, 0) /
      avgHourlyBudgetData.length
  );

  return (
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
              duration: 0.8,
            },
          },
        },
      }}
      className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto'
    >
      <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between mb-2'>
            <TrendingUp className='w-5 h-5 text-[#D94C58]' />
            <span className='text-xs text-white/60'>Total Jobs</span>
          </div>
          <p className='text-2xl font-bold text-white'>{totalJobs}</p>
        </CardContent>
      </Card>
      <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between mb-2'>
            <DollarSign className='w-5 h-5 text-[#D94C58]' />
            <span className='text-xs text-white/60'>Avg. Spent</span>
          </div>
          <p className='text-2xl font-bold text-white'>
            ${(avgSpent / 1000).toFixed(0)}k
          </p>
        </CardContent>
      </Card>
      <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between mb-2'>
            <Users className='w-5 h-5 text-[#D94C58]' />
            <span className='text-xs text-white/60'>Hire Rate</span>
          </div>
          <p className='text-2xl font-bold text-white'>{avgHireRate}%</p>
        </CardContent>
      </Card>
      <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between mb-2'>
            <Clock className='w-5 h-5 text-[#D94C58]' />
            <span className='text-xs text-white/60'>Hourly Rate</span>
          </div>
          <p className='text-2xl font-bold text-white'>${avgHourly}/hr</p>
        </CardContent>
      </Card>
    </AnimatedGroup>
  );
}
