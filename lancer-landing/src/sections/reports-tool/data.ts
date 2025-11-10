// Helper function to truncate category names
export const truncateCategory = (
  name: string,
  maxLength: number = 10
): string => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
};

// Country data
export const jobsPostedData = [
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

export const avgSpentData = [
  { country: 'Germany', avgSpent: 13400 },
  { country: 'USA', avgSpent: 12500 },
  { country: 'Netherlands', avgSpent: 11500 },
  { country: 'France', avgSpent: 11200 },
  { country: 'UK', avgSpent: 10800 },
  { country: 'Australia', avgSpent: 10200 },
  { country: 'Canada', avgSpent: 9800 },
  { country: 'Spain', avgSpent: 8900 },
  { country: 'Italy', avgSpent: 7600 },
  { country: 'Brazil', avgSpent: 6800 },
];

export const hireRateData = [
  { country: 'Netherlands', hireRate: 68 },
  { country: 'Germany', hireRate: 65 },
  { country: 'UK', hireRate: 62 },
  { country: 'USA', hireRate: 58 },
  { country: 'Canada', hireRate: 55 },
  { country: 'Australia', hireRate: 52 },
  { country: 'France', hireRate: 48 },
  { country: 'Spain', hireRate: 45 },
  { country: 'Italy', hireRate: 42 },
  { country: 'Brazil', hireRate: 38 },
];

export const avgHourlyBudgetData = [
  { country: 'USA', avgHourlyBudget: 85 },
  { country: 'Germany', avgHourlyBudget: 78 },
  { country: 'UK', avgHourlyBudget: 72 },
  { country: 'Netherlands', avgHourlyBudget: 70 },
  { country: 'Australia', avgHourlyBudget: 68 },
  { country: 'Canada', avgHourlyBudget: 65 },
  { country: 'France', avgHourlyBudget: 62 },
  { country: 'Spain', avgHourlyBudget: 55 },
  { country: 'Italy', avgHourlyBudget: 48 },
  { country: 'Brazil', avgHourlyBudget: 42 },
];

export const avgPaidPerProjectData = [
  { country: 'USA', avgPaidPerProject: 5200 },
  { country: 'Germany', avgPaidPerProject: 4800 },
  { country: 'UK', avgPaidPerProject: 4500 },
  { country: 'Netherlands', avgPaidPerProject: 4200 },
  { country: 'Australia', avgPaidPerProject: 4100 },
  { country: 'Canada', avgPaidPerProject: 3900 },
  { country: 'France', avgPaidPerProject: 3600 },
  { country: 'Spain', avgPaidPerProject: 3200 },
  { country: 'Italy', avgPaidPerProject: 2800 },
  { country: 'Brazil', avgPaidPerProject: 2400 },
];

// Category data with full names and truncated display names
export const jobsPostedByCategoryData = [
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    jobsPosted: 320,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    jobsPosted: 285,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    jobsPosted: 245,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    jobsPosted: 198,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    jobsPosted: 167,
  },
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    jobsPosted: 142,
  },
];

export const avgSpentByCategoryData = [
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    avgSpent: 15200,
  },
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    avgSpent: 13800,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    avgSpent: 12400,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    avgSpent: 11200,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    avgSpent: 9800,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    avgSpent: 8600,
  },
];

export const hireRateByCategoryData = [
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    hireRate: 72,
  },
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    hireRate: 68,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    hireRate: 65,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    hireRate: 58,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    hireRate: 52,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    hireRate: 48,
  },
];

export const avgHourlyBudgetByCategoryData = [
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    avgHourlyBudget: 95,
  },
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    avgHourlyBudget: 88,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    avgHourlyBudget: 75,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    avgHourlyBudget: 68,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    avgHourlyBudget: 62,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    avgHourlyBudget: 55,
  },
];

export const avgPaidPerProjectByCategoryData = [
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    avgPaidPerProject: 6800,
  },
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    avgPaidPerProject: 6200,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    avgPaidPerProject: 5400,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    avgPaidPerProject: 4800,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    avgPaidPerProject: 4200,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    avgPaidPerProject: 3600,
  },
];

// Chart configs
export const jobsPostedConfig = {
  jobsPosted: {
    label: 'Jobs Posted',
    color: '#D94C58',
  },
};

export const avgSpentConfig = {
  avgSpent: {
    label: 'Avg. Client Total Spent',
    color: '#D94C58',
  },
};

export const hireRateConfig = {
  hireRate: {
    label: 'Client Hire Rate',
    color: '#D94C58',
  },
};

export const avgHourlyBudgetConfig = {
  avgHourlyBudget: {
    label: 'Avg. Hourly Rate Paid',
    color: '#D94C58',
  },
};

export const avgPaidPerProjectConfig = {
  avgPaidPerProject: {
    label: 'Avg. Paid Per Project',
    color: '#D94C58',
  },
};

// Client Quality Metrics - Country
export const avgJobsPostedByCountryData = [
  { country: 'Netherlands', avgJobsPosted: 22.3 },
  { country: 'Germany', avgJobsPosted: 18.5 },
  { country: 'France', avgJobsPosted: 16.7 },
  { country: 'USA', avgJobsPosted: 15.2 },
  { country: 'UK', avgJobsPosted: 14.8 },
  { country: 'Australia', avgJobsPosted: 13.4 },
  { country: 'Canada', avgJobsPosted: 12.6 },
  { country: 'Spain', avgJobsPosted: 11.2 },
  { country: 'Italy', avgJobsPosted: 10.5 },
  { country: 'Brazil', avgJobsPosted: 8.9 },
];

// Budget Type Distribution - Country
export const budgetTypeByCountryData = [
  { country: 'USA', fixed: 58, hourly: 42 },
  { country: 'Germany', fixed: 52, hourly: 48 },
  { country: 'UK', fixed: 55, hourly: 45 },
  { country: 'Netherlands', fixed: 48, hourly: 52 },
  { country: 'Canada', fixed: 60, hourly: 40 },
  { country: 'Australia', fixed: 62, hourly: 38 },
  { country: 'France', fixed: 65, hourly: 35 },
  { country: 'Spain', fixed: 70, hourly: 30 },
  { country: 'Italy', fixed: 72, hourly: 28 },
  { country: 'Brazil', fixed: 75, hourly: 25 },
];

// Client Quality Metrics - Category
export const avgJobsPostedByCategoryData = [
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    avgJobsPosted: 24.5,
  },
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    avgJobsPosted: 19.8,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    avgJobsPosted: 16.2,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    avgJobsPosted: 14.7,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    avgJobsPosted: 12.3,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    avgJobsPosted: 10.8,
  },
];

// Budget Type Distribution - Category
export const budgetTypeByCategoryData = [
  {
    category: 'software development',
    categoryDisplay: truncateCategory('software development'),
    fixed: 45,
    hourly: 55,
  },
  {
    category: 'Accounting and consulting',
    categoryDisplay: truncateCategory('Accounting and consulting'),
    fixed: 42,
    hourly: 58,
  },
  {
    category: 'design & creative',
    categoryDisplay: truncateCategory('design & creative'),
    fixed: 68,
    hourly: 32,
  },
  {
    category: 'digital marketing',
    categoryDisplay: truncateCategory('digital marketing'),
    fixed: 72,
    hourly: 28,
  },
  {
    category: 'Sales and Marketing',
    categoryDisplay: truncateCategory('Sales and Marketing'),
    fixed: 78,
    hourly: 22,
  },
  {
    category: 'Customer Service',
    categoryDisplay: truncateCategory('Customer Service'),
    fixed: 62,
    hourly: 38,
  },
];

// Chart configs for new metrics
export const avgJobsPostedConfig = {
  avgJobsPosted: {
    label: 'Avg. Jobs Posted by Client',
    color: '#D94C58',
  },
};

export const budgetTypeConfig = {
  fixed: {
    label: 'Fixed Price',
    color: '#D94C58',
  },
  hourly: {
    label: 'Hourly',
    color: '#8B5CF6',
  },
};
