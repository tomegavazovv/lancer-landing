interface FeedFilterRatioBarProps {
  lastMonthTotal: number;
  lastMonthTotalWithEmptyFilters: number;
  isLoading: boolean;
}

export default function FeedFilterRatioBar({
  lastMonthTotal,
  lastMonthTotalWithEmptyFilters,
  isLoading,
}: FeedFilterRatioBarProps) {
  const calculateLogScale = (value: number, maxValue: number) => {
    if (value <= 0 || maxValue <= 0) return 0;

    // Calculate log base 1000 for both values
    const logValue = Math.log(value) / Math.log(1000);
    const logMaxValue = Math.log(maxValue) / Math.log(1000);

    // Return percentage based on logarithmic scale
    return Math.min((logValue / logMaxValue) * 100, 100);
  };

  const calculateFullGradient = (maxValue: number) => {
    // Calculate absolute positions for 900 and 2500 on the logarithmic scale
    const logMax = Math.log(maxValue) / Math.log(1000);
    const log900 = Math.log(900) / Math.log(1000);
    const log2500 = Math.log(2500) / Math.log(1000);

    // Calculate percentages for absolute thresholds
    const greenEndPercent = (log900 / logMax) * 100;
    const yellowEndPercent = (log2500 / logMax) * 100;

    // Ensure we don't exceed 100%
    const safeGreenEnd = Math.min(greenEndPercent, 100);
    const safeYellowEnd = Math.min(yellowEndPercent, 100);

    if (maxValue <= 900) {
      return 'linear-gradient(to right, #22c55e 100%)';
    }

    if (maxValue <= 2500) {
      // Sharp transition from green to yellow
      const transitionZone = 2; // Much smaller transition zone
      const transitionStart = Math.max(0, safeGreenEnd - transitionZone);
      const transitionEnd = Math.min(100, safeGreenEnd + transitionZone);

      return `linear-gradient(to right, #22c55e ${transitionStart}%, #eab308 ${transitionEnd}%, #eab308 100%)`;
    }

    // For values > 2500, show all three colors with sharp transitions
    const transitionZone = 1.5; // Very small transition zones
    const greenToYellowStart = Math.max(0, safeGreenEnd - transitionZone);
    const greenToYellowEnd = Math.min(100, safeGreenEnd + transitionZone);
    const yellowToRedStart = Math.max(0, safeYellowEnd - transitionZone);
    const yellowToRedEnd = Math.min(100, safeYellowEnd + transitionZone);

    return `linear-gradient(to right, 
      #22c55e ${greenToYellowStart}%, 
      #eab308 ${greenToYellowEnd}%, 
      #eab308 ${yellowToRedStart}%, 
      #ef4444 ${yellowToRedEnd}%, 
      #ef4444 100%)`;
  };

  const percentage = calculateLogScale(lastMonthTotal, lastMonthTotalWithEmptyFilters);
  const fullGradient = calculateFullGradient(lastMonthTotalWithEmptyFilters);

  return (
    <div className="w-full">
      <div className="relative h-2 w-full overflow-hidden rounded-full">
        {isLoading && <div className="h-full w-full bg-gray-200 animate-pulse" />}
        {!isLoading && (
          <>
            <div className="h-full w-full" style={{ background: fullGradient }} />
            <div
              className="absolute top-0 h-full bg-white/70 transition-all duration-300 ease-in-out"
              style={{
                left: `${percentage}%`,
                width: `${100 - percentage}%`,
              }}
            />
            <div
              className="absolute top-0 h-full w-0.5 bg-white shadow-md transition-all duration-300 ease-in-out"
              style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
            />
          </>
        )}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span></span>
        {/* <span className="text-xs">{formatNumber(lastMonthTotalWithEmptyFilters)}</span> */}
      </div>
    </div>
  );
}

