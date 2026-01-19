import { poster } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import {
  GetAverageClientHireRateResponse,
  GetAverageClientTotalSpentResponse,
  GetAverageFixedPriceBudgetResponse,
  GetAverageHourlyRateBudgetResponse,
  GetAverageHourlyRatePaidByCountryResponse,
  GetAveragePaidPerProjectResponse,
  GetJobsByClientTotalSpentResponse,
  GetJobsByDayOfWeekResponse,
  GetJobsByHourPostedResponse,
  GetJobsCountLast3MonthsResponse,
  GetJobsPostedResponse,
  GetTop10CategoriesByAvgPaidPerProjectResponse,
  GetTop10CategoriesByClientHireRateResponse,
  GetTop10CategoriesByClientTotalSpentResponse,
  GetTop10CategoriesByJobsPostedResponse,
  GetTop10CountriesByAvgHourlyBudgetResponse,
  GetTop10CountriesByAvgPaidPerProjectResponse,
  GetTop10CountriesByClientHireRateResponse,
  GetTop10CountriesByClientTotalSpentResponse,
  GetTop10CountriesByJobsPostedResponse,
  GetTop10SkillsResponse,
  GetTop20CategoriesByAvgHourlyRatePaidResponse,
  JobFilters,
  ROUTES,
} from 'lancer-shared';

/**
 * Hook for Keyword/Query tab analytics
 * Only fetches data needed for the keyword breakdown view
 */
export function useKeywordAnalytics(
  query: string,
  filters?: JobFilters,
  enabled: boolean = true
) {
  const requestBody = filters ? { query, filters } : { query };
  const getJobsPosted = useQuery({
    queryKey: ['keyword-analytics', 'jobs-posted', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetJobsPostedResponse
      >(ROUTES.UPWORK_ANALYTICS.JOBS_POSTED, requestBody);
      return response.data;
    },
    enabled,
  });

  const getAverageClientHireRate = useQuery({
    queryKey: ['keyword-analytics', 'average-client-hire-rate', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetAverageClientHireRateResponse
      >(ROUTES.UPWORK_ANALYTICS.AVERAGE_CLIENT_HIRE_RATE, requestBody);
      return response.data;
    },
    enabled,
  });

  const getAverageClientTotalSpent = useQuery({
    queryKey: ['keyword-analytics', 'average-client-total-spent', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetAverageClientTotalSpentResponse
      >(ROUTES.UPWORK_ANALYTICS.AVERAGE_CLIENT_TOTAL_SPENT, requestBody);
      return response.data;
    },
    enabled,
  });

  const getAverageHourlyRateBudget = useQuery({
    queryKey: ['keyword-analytics', 'average-hourly-rate-budget', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetAverageHourlyRateBudgetResponse
      >(ROUTES.UPWORK_ANALYTICS.AVERAGE_HOURLY_RATE_BUDGET, requestBody);
      return response.data;
    },
    enabled,
  });

  const getAverageFixedPriceBudget = useQuery({
    queryKey: ['keyword-analytics', 'average-fixed-price-budget', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetAverageFixedPriceBudgetResponse
      >(ROUTES.UPWORK_ANALYTICS.AVERAGE_FIXED_PRICE_BUDGET, requestBody);
      return response.data;
    },
    enabled,
  });

  const getAveragePaidPerProject = useQuery({
    queryKey: ['keyword-analytics', 'average-paid-per-project', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetAveragePaidPerProjectResponse
      >(ROUTES.UPWORK_ANALYTICS.AVERAGE_PAID_PER_PROJECT, requestBody);
      return response.data;
    },
    enabled,
  });

  const getJobsCountLast3Months = useQuery({
    queryKey: ['keyword-analytics', 'jobs-count-last-3-months', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetJobsCountLast3MonthsResponse
      >(ROUTES.UPWORK_ANALYTICS.JOBS_COUNT_LAST_3_MONTHS, requestBody);
      return response.data;
    },
    enabled,
  });

  const getTop10CountriesByJobsPosted = useQuery({
    queryKey: ['keyword-analytics', 'top-10-countries-by-jobs-posted', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetTop10CountriesByJobsPostedResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_COUNTRIES_BY_JOBS_POSTED, requestBody);
      return response.data;
    },
    enabled,
  });

  const getJobsByClientTotalSpent = useQuery({
    queryKey: ['keyword-analytics', 'jobs-by-client-total-spent', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetJobsByClientTotalSpentResponse
      >(ROUTES.UPWORK_ANALYTICS.JOBS_BY_CLIENT_TOTAL_SPENT, requestBody);
      return response.data;
    },
    enabled,
  });

  const getJobsByHourPosted = useQuery({
    queryKey: ['keyword-analytics', 'jobs-by-hour-posted', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetJobsByHourPostedResponse
      >(ROUTES.UPWORK_ANALYTICS.JOBS_BY_HOUR_POSTED, requestBody);
      return response.data;
    },
    enabled,
  });

  const getJobsByDayOfWeek = useQuery({
    queryKey: ['keyword-analytics', 'jobs-by-day-of-week', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetJobsByDayOfWeekResponse
      >(ROUTES.UPWORK_ANALYTICS.JOBS_BY_DAY_OF_WEEK, requestBody);
      return response.data;
    },
    enabled,
  });

  const getTop10Skills = useQuery({
    queryKey: ['keyword-analytics', 'top-10-skills', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetTop10SkillsResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_SKILLS, requestBody);
      return response.data;
    },
    enabled,
  });

  const getAverageHourlyRatePaidByCountry = useQuery({
    queryKey: [
      'keyword-analytics',
      'average-hourly-rate-paid-by-country',
      query,
      filters,
    ],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        GetAverageHourlyRatePaidByCountryResponse
      >(ROUTES.UPWORK_ANALYTICS.AVERAGE_HOURLY_RATE_PAID_BY_COUNTRY, requestBody);
      return response.data;
    },
    enabled,
  });

  const getJobsByClientHireRate = useQuery({
    queryKey: ['keyword-analytics', 'jobs-by-client-hire-rate', query, filters],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        any
      >('upwork-analytics/jobs-by-client-hire-rate', requestBody);
      return response.data;
    },
    enabled,
  });

  const getJobsByClientTotalJobsPosted = useQuery({
    queryKey: [
      'keyword-analytics',
      'jobs-by-client-total-jobs-posted',
      query,
      filters,
    ],
    queryFn: async () => {
      const response = await poster<
        { query: string; filters?: JobFilters },
        any
      >('upwork-analytics/jobs-by-client-total-jobs-posted', requestBody);
      return response.data;
    },
    enabled,
  });

  return {
    getJobsPosted,
    getAverageClientHireRate,
    getAverageClientTotalSpent,
    getAverageHourlyRateBudget,
    getAverageFixedPriceBudget,
    getAveragePaidPerProject,
    getJobsCountLast3Months,
    getTop10CountriesByJobsPosted,
    getJobsByClientTotalSpent,
    getJobsByHourPosted,
    getJobsByDayOfWeek,
    getTop10Skills,
    getAverageHourlyRatePaidByCountry,
    getJobsByClientHireRate,
    getJobsByClientTotalJobsPosted,
  };
}

/**
 * Hook for Country tab analytics
 * Only fetches data needed for the country charts view
 */
export function useCountryAnalytics() {
  const getTop10CountriesByJobsPosted = useQuery({
    queryKey: ['country-analytics', 'top-10-countries-by-jobs-posted'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CountriesByJobsPostedResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_COUNTRIES_BY_JOBS_POSTED, { query: '' });
      return response.data;
    },
  });

  const getTop10CountriesByClientTotalSpent = useQuery({
    queryKey: ['country-analytics', 'top-10-countries-by-client-total-spent'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CountriesByClientTotalSpentResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_COUNTRIES_BY_CLIENT_TOTAL_SPENT, {
        query: '',
      });
      return response.data;
    },
  });

  const getTop10CountriesByClientHireRate = useQuery({
    queryKey: ['country-analytics', 'top-10-countries-by-client-hire-rate'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CountriesByClientHireRateResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_COUNTRIES_BY_CLIENT_HIRE_RATE, {
        query: '',
      });
      return response.data;
    },
  });

  const getTop10CountriesByAvgHourlyBudget = useQuery({
    queryKey: ['country-analytics', 'top-10-countries-by-avg-hourly-budget'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CountriesByAvgHourlyBudgetResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_COUNTRIES_BY_AVG_HOURLY_BUDGET, {
        query: '',
      });
      return response.data;
    },
  });

  const getTop10CountriesByAvgPaidPerProject = useQuery({
    queryKey: ['country-analytics', 'top-10-countries-by-avg-paid-per-project'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CountriesByAvgPaidPerProjectResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_COUNTRIES_BY_AVG_PAID_PER_PROJECT, {
        query: '',
      });
      return response.data;
    },
  });

  return {
    getTop10CountriesByJobsPosted,
    getTop10CountriesByClientTotalSpent,
    getTop10CountriesByClientHireRate,
    getTop10CountriesByAvgHourlyBudget,
    getTop10CountriesByAvgPaidPerProject,
  };
}

/**
 * Hook for Category tab analytics
 * Only fetches data needed for the category charts view
 */
export function useCategoryAnalytics() {
  const getTop10CategoriesByJobsPosted = useQuery({
    queryKey: ['category-analytics', 'top-10-categories-by-jobs-posted'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CategoriesByJobsPostedResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_CATEGORIES_BY_JOBS_POSTED, {
        query: '',
      });
      return response.data;
    },
  });

  const getTop10CategoriesByClientTotalSpent = useQuery({
    queryKey: ['category-analytics', 'top-10-categories-by-client-total-spent'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CategoriesByClientTotalSpentResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_CATEGORIES_BY_CLIENT_TOTAL_SPENT, {
        query: '',
      });
      return response.data;
    },
  });

  const getTop10CategoriesByClientHireRate = useQuery({
    queryKey: ['category-analytics', 'top-10-categories-by-client-hire-rate'],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CategoriesByClientHireRateResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_CATEGORIES_BY_CLIENT_HIRE_RATE, {
        query: '',
      });
      return response.data;
    },
  });

  // const getTop10CategoriesByAvgHourlyBudget = useQuery({
  //   queryKey: ['category-analytics', 'top-10-categories-by-avg-hourly-budget'],
  //   queryFn: async () => {
  //     const response = await poster<
  //       { query: string },
  //       GetTop10CategoriesByAvgHourlyBudgetResponse
  //     >(ROUTES.UPWORK_ANALYTICS.TOP_10_CATEGORIES_BY_AVG_HOURLY_BUDGET, {
  //       query: '',
  //     });
  //     return response.data;
  //   },
  // });

  const getTop10CategoriesByAvgPaidPerProject = useQuery({
    queryKey: [
      'category-analytics',
      'top-10-categories-by-avg-paid-per-project',
    ],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop10CategoriesByAvgPaidPerProjectResponse
      >(ROUTES.UPWORK_ANALYTICS.TOP_10_CATEGORIES_BY_AVG_PAID_PER_PROJECT, {
        query: '',
      });
      return response.data;
    },
  });

  const getTop20CategoriesByAvgHourlyRatePaid = useQuery({
    queryKey: [
      'category-analytics',
      'top-20-categories-by-avg-hourly-rate-paid',
    ],
    queryFn: async () => {
      const response = await poster<
        { query: string },
        GetTop20CategoriesByAvgHourlyRatePaidResponse
      >('upwork-analytics/top-20-categories-by-avg-hourly-rate-paid', {
        query: '',
      });
      return response.data;
    },
  });

  return {
    getTop10CategoriesByJobsPosted,
    getTop10CategoriesByClientTotalSpent,
    getTop10CategoriesByClientHireRate,
    getTop10CategoriesByAvgPaidPerProject,
    getTop20CategoriesByAvgHourlyRatePaid,
  };
}
