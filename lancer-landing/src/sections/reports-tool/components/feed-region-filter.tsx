import NextImage from '@/components/next/next-image';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Counts, JobFilters as LeadFilters, regionNames } from 'lancer-shared';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FeedRegionFilterProps {
  control: Control<LeadFilters>;
  disabled: boolean;
  counts: Counts | undefined;
}

export default function FeedRegionFilter({ control, disabled, counts }: FeedRegionFilterProps) {
  // Simplified version without useCampaign hook - for analytics use case
  const [showRegionWarning, setShowRegionWarning] = useState(false);
  const [pendingRegionChange, setPendingRegionChange] = useState<string | null>(null);

  const handleRegionChange = (
    selectedRegion: string,
    currentRegion: string,
    onChange: (region: string) => void
  ) => {
    // For analytics, we can change region directly without campaign restrictions
    onChange(selectedRegion);
  };

  const confirmRegionChange = (onChange: (region: string) => void) => {
    if (pendingRegionChange) {
      onChange(pendingRegionChange);
      setPendingRegionChange(null);
      setShowRegionWarning(false);
    }
  };

  const cancelRegionChange = () => {
    setPendingRegionChange(null);
    setShowRegionWarning(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-base font-bold text-white">Region</div>
      <div className="relative">
        <Controller
          name="regions"
          control={control}
          render={({ field: { value, onChange } }) => {
            const currentRegion = value?.[0] || 'Worldwide';

            return (
              <>
                <Tabs value={currentRegion}>
                  <TabsList className="w-full bg-white/10 border border-white/20 p-1">
                    <TabsTrigger
                      value="Worldwide"
                      disabled={disabled}
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-white/60 data-[state=active]:text-gray-900 data-[state=active]:font-semibold data-[state=inactive]:text-white data-[state=inactive]:bg-white/10 data-[state=inactive]:border-transparent flex items-center gap-2 transition-all"
                      onClick={() => {
                        if (currentRegion !== 'Worldwide') {
                          handleRegionChange('Worldwide', currentRegion, (region) =>
                            onChange(region ? [region] : ['Worldwide'])
                          );
                        }
                      }}
                    >
                      <NextImage src="/world.png" alt="Worldwide" width={16} height={16} />
                      {regionNames.Worldwide}
                      {!!counts && (
                        <span className="text-sm data-[state=active]:text-gray-700 data-[state=inactive]:text-white/80">
                          ({counts?.region?.['Worldwide'] ?? 0})
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="USOnly"
                      disabled={disabled}
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-white/60 data-[state=active]:text-gray-900 data-[state=active]:font-semibold data-[state=inactive]:text-white data-[state=inactive]:bg-white/10 data-[state=inactive]:border-transparent flex items-center gap-2 transition-all"
                      onClick={() => {
                        if (currentRegion !== 'USOnly') {
                          handleRegionChange('USOnly', currentRegion, (region) =>
                            onChange(region ? [region] : ['Worldwide'])
                          );
                        }
                      }}
                    >
                      <NextImage src="/united-states.png" alt="US Only" width={16} height={16} />
                      {regionNames.USOnly}
                      {!!counts && (
                        <span className="text-sm data-[state=active]:text-gray-700 data-[state=inactive]:text-white/80">
                          ({counts?.region?.['USOnly'] ?? 0})
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                {showRegionWarning && (
                  <Popover open={showRegionWarning} onOpenChange={setShowRegionWarning}>
                    <PopoverTrigger asChild>
                      <div
                        className={`absolute top-0 w-1 h-1 opacity-0 ${
                          currentRegion === 'Worldwide'
                            ? 'left-1/4 transform -translate-x-1/2'
                            : 'right-1/4 transform translate-x-1/2'
                        }`}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-80 bg-[#0A0A0A] border-white/20"
                      side="top"
                      align={currentRegion === 'Worldwide' ? 'start' : 'end'}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-white">Switch Region</h3>
                        </div>
                        <div className="text-sm text-white/70">
                          Switching to{' '}
                          {regionNames[pendingRegionChange as keyof typeof regionNames]} will
                          update your filter settings.
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" onClick={cancelRegionChange}>
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              confirmRegionChange((region) =>
                                onChange(region ? [region] : ['Worldwide'])
                              )
                            }
                          >
                            Switch Region
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

