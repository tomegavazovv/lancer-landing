import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/services/api';
import { ROUTES } from 'lancer-shared';

export type FilterOptions = {
  englishLevels: { key: string }[];
  locations: { key: string }[];
  experienceLevels: { key: string }[];
  talentTypes: { key: string }[];
};

export const useFilterOptions = () => {
  const { data, isLoading, error } = useQuery<FilterOptions>({
    queryKey: ['filter-options'],
    queryFn: () => fetcher(ROUTES.JOBS.FILTER_OPTIONS),
  });

  const countries =
    data?.locations.map((location) => ({
      label: location.key,
      value: location.key,
    })) || [];

  return {
    filterOptions: data,
    countries,
    isLoading,
    error,
  };
};

