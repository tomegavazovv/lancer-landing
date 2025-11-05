import { StatCard } from '../types';

interface CaseStudyStatsProps {
  title: string;
  cards: StatCard[];
  fullWidthCard?: StatCard;
}

export function CaseStudyStats({
  title,
  cards,
  fullWidthCard,
}: CaseStudyStatsProps) {
  // Determine grid columns based on number of cards
  const getGridCols = () => {
    if (cards.length === 1) return 'md:grid-cols-1';
    if (cards.length === 2) return 'md:grid-cols-2';
    return 'md:grid-cols-3';
  };

  return (
    <section className='py-12'>
      <div className='mx-auto max-w-4xl px-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-white mb-8 text-center'>
          {title}
        </h2>

        {/* First Row: Flexible Cards */}
        {cards.length > 0 && (
          <div className={`grid grid-cols-1 ${getGridCols()} gap-4 mb-6`}>
            {cards.map((card, index) => (
              <StatCardComponent key={index} card={card} />
            ))}
          </div>
        )}

        {/* Second Row: Full Width Card */}
        {fullWidthCard && (
          <div className='bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors w-full'>
            <StatCardComponent card={fullWidthCard} />
          </div>
        )}
      </div>
    </section>
  );
}

function StatCardComponent({ card }: { card: StatCard }) {
  const Icon = card.icon;
  return (
    <div className='bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors'>
      <div className='flex flex-col items-center text-center space-y-3'>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center`}
          style={{ backgroundColor: card.iconBgColor }}
        >
          <Icon className='w-5 h-5' style={{ color: card.iconColor }} />
        </div>
        <div className='w-full'>
          <div className='text-xs text-white/70 mb-1'>{card.label}</div>
          <div className='text-2xl md:text-3xl font-bold text-white mb-2'>
            {card.value}
          </div>
          <div
            className='h-1 rounded-full w-12 mx-auto'
            style={{ backgroundColor: card.barColor }}
          ></div>
        </div>
      </div>
    </div>
  );
}
