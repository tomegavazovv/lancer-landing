'use client';

import { Badge } from '@/components/ui/badge';
import { JobFilters } from 'lancer-shared';
import { X } from 'lucide-react';
import { useMemo } from 'react';

interface FilterBadgesProps {
  filters: JobFilters;
  onRemoveFilter: (filterKey: string, value?: any) => void;
  onClearAll: () => void;
}

export function FilterBadges({ filters, onRemoveFilter, onClearAll }: FilterBadgesProps) {
  const activeFilters = useMemo(() => {
    const badges: Array<{ key: string; label: string; value: any }> = [];

    // Region
    if (filters.regions && filters.regions.length > 0 && filters.regions[0] !== 'Worldwide') {
      badges.push({
        key: 'regions',
        label: 'Region',
        value: filters.regions[0],
      });
    }

    // Search Query
    if (filters.searchQuery && filters.searchQuery.trim()) {
      badges.push({
        key: 'searchQuery',
        label: 'Query',
        value: filters.searchQuery,
      });
    }

    // Categories - Includes
    if (filters.categories?.includes && filters.categories.includes.length > 0) {
      badges.push({
        key: 'categories.includes',
        label: 'Categories',
        value: filters.categories.includes.length,
      });
    }

    // Categories - Excludes
    if (filters.categories?.excludes && filters.categories.excludes.length > 0) {
      badges.push({
        key: 'categories.excludes',
        label: 'Excluded Categories',
        value: filters.categories.excludes.length,
      });
    }

    // Experience Level
    if (filters.experienceLevel && filters.experienceLevel.length > 0) {
      badges.push({
        key: 'experienceLevel',
        label: 'Experience',
        value: filters.experienceLevel.join(', '),
      });
    }

    // Client Location - Includes
    if (
      filters.clientInfo?.clientLocationIncludes &&
      filters.clientInfo.clientLocationIncludes.length > 0
    ) {
      badges.push({
        key: 'clientInfo.clientLocationIncludes',
        label: 'Countries',
        value: filters.clientInfo.clientLocationIncludes.length,
      });
    }

    // Client Location - Excludes
    if (
      filters.clientInfo?.clientLocationExcludes &&
      filters.clientInfo.clientLocationExcludes.length > 0
    ) {
      badges.push({
        key: 'clientInfo.clientLocationExcludes',
        label: 'Excluded Countries',
        value: filters.clientInfo.clientLocationExcludes.length,
      });
    }

    // Payment Verified
    if (filters.clientInfo?.isPaymentVerified === 'true') {
      badges.push({
        key: 'clientInfo.isPaymentVerified',
        label: 'Payment Verified',
        value: true,
      });
    }

    // Phone Verified
    if (filters.clientInfo?.isPhoneVerified === 'true') {
      badges.push({
        key: 'clientInfo.isPhoneVerified',
        label: 'Phone Verified',
        value: true,
      });
    }

    // Total Spent Range
    if (filters.clientInfo?.minTotalSpent || filters.clientInfo?.maxTotalSpent) {
      const min = filters.clientInfo.minTotalSpent
        ? `$${filters.clientInfo.minTotalSpent.toLocaleString()}`
        : '';
      const max = filters.clientInfo.maxTotalSpent
        ? `$${filters.clientInfo.maxTotalSpent.toLocaleString()}`
        : '';
      badges.push({
        key: 'clientInfo.totalSpent',
        label: 'Total Spent',
        value: `${min}${min && max ? ' - ' : ''}${max}`,
      });
    }

    // Hourly Rate Range
    if (filters.clientInfo?.minAvgHourlyRate || filters.clientInfo?.maxAvgHourlyRate) {
      const min = filters.clientInfo.minAvgHourlyRate
        ? `$${filters.clientInfo.minAvgHourlyRate.toFixed(2)}`
        : '';
      const max = filters.clientInfo.maxAvgHourlyRate
        ? `$${filters.clientInfo.maxAvgHourlyRate.toFixed(2)}`
        : '';
      badges.push({
        key: 'clientInfo.avgHourlyRate',
        label: 'Hourly Rate',
        value: `${min}${min && max ? ' - ' : ''}${max}`,
      });
    }

    // Hire Rate Range
    if (filters.clientInfo?.minHireRate || filters.clientInfo?.maxHireRate) {
      const min = filters.clientInfo.minHireRate ? `${filters.clientInfo.minHireRate}%` : '';
      const max = filters.clientInfo.maxHireRate ? `${filters.clientInfo.maxHireRate}%` : '';
      badges.push({
        key: 'clientInfo.hireRate',
        label: 'Hire Rate',
        value: `${min}${min && max ? ' - ' : ''}${max}`,
      });
    }

    // Min Reviews
    if (filters.clientInfo?.minNumReviews) {
      badges.push({
        key: 'clientInfo.minNumReviews',
        label: 'Min Reviews',
        value: filters.clientInfo.minNumReviews,
      });
    }

    // Min Review Score
    if (filters.clientInfo?.minReviewScore) {
      badges.push({
        key: 'clientInfo.minReviewScore',
        label: 'Min Rating',
        value: filters.clientInfo.minReviewScore,
      });
    }

    // Company Size
    if (filters.clientInfo?.companySize && filters.clientInfo.companySize.length > 0) {
      badges.push({
        key: 'clientInfo.companySize',
        label: 'Company Size',
        value: filters.clientInfo.companySize.length,
      });
    }

    // Payment Type
    if (filters.payment?.paymentType && filters.payment.paymentType.length > 0) {
      badges.push({
        key: 'payment.paymentType',
        label: 'Payment Type',
        value: filters.payment.paymentType.join(', '),
      });
    }

    // Hourly Rate Range (Payment)
    if (filters.payment?.minHourlyRate || filters.payment?.maxHourlyRate) {
      const min = filters.payment.minHourlyRate
        ? `$${filters.payment.minHourlyRate.toLocaleString()}`
        : '';
      const max = filters.payment.maxHourlyRate
        ? `$${filters.payment.maxHourlyRate.toLocaleString()}`
        : '';
      badges.push({
        key: 'payment.hourlyRate',
        label: 'Job Hourly Rate',
        value: `${min}${min && max ? ' - ' : ''}${max}`,
      });
    }

    // Fixed Price Range
    if (filters.payment?.minFixedPrice || filters.payment?.maxFixedPrice) {
      const min = filters.payment.minFixedPrice
        ? `$${filters.payment.minFixedPrice.toLocaleString()}`
        : '';
      const max = filters.payment.maxFixedPrice
        ? `$${filters.payment.maxFixedPrice.toLocaleString()}`
        : '';
      badges.push({
        key: 'payment.fixedPrice',
        label: 'Fixed Price',
        value: `${min}${min && max ? ' - ' : ''}${max}`,
      });
    }

    // Project Duration
    if (filters.projectDuration && filters.projectDuration.length > 0) {
      badges.push({
        key: 'projectDuration',
        label: 'Duration',
        value: filters.projectDuration.join(', '),
      });
    }

    // Screening Questions
    if (filters.questions?.hasQuestions && filters.questions.hasQuestions.includes('yes')) {
      badges.push({
        key: 'questions.hasQuestions',
        label: 'With Questions',
        value: true,
      });
    }

    return badges;
  }, [filters]);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-wrap items-center gap-2 mt-4'>
      {activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          variant='outline'
          className='bg-white/10 border-white/20 text-white hover:bg-white/15 pr-1'
        >
          <span className='mr-1'>
            {filter.label}: {typeof filter.value === 'boolean' ? '' : filter.value}
          </span>
          <button
            onClick={() => onRemoveFilter(filter.key, filter.value)}
            className='ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors'
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}
      <button
        onClick={onClearAll}
        className='text-xs text-white/70 hover:text-white underline'
      >
        Clear all
      </button>
    </div>
  );
}

