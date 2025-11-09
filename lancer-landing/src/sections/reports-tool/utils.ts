export interface MonthOption {
  value: string;
  label: string;
  monthIndex: number; // 0 = current month, 1 = previous month, 2 = 2 months ago
}

/**
 * Gets the past 3 months dynamically (current month and 2 previous months)
 * @returns Array of month options with value, label, and monthIndex
 */
export function getPastThreeMonths(): MonthOption[] {
  const now = new Date();
  const months: MonthOption[] = [];

  // Current month (index 0)
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  months.push({
    value: 'all',
    label: 'Past 3 Months',
    monthIndex: -1, // Special value for "all"
  });

  // Add individual months (current, previous, 2 months ago)
  for (let i = 0; i < 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    const monthValue = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`;

    months.push({
      value: monthValue,
      label: monthName,
      monthIndex: i,
    });
  }

  return months;
}

/**
 * Formats a month value (YYYY-MM) to a readable string
 */
export function formatMonthValue(value: string): string {
  if (value === 'all') return 'Past 3 Months';

  const [year, month] = value.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
