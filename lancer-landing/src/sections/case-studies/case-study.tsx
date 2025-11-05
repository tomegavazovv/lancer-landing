import { CaseStudyContent, CaseStudyHero, CaseStudyStats } from './components';
import { CaseStudyData } from './types';

interface CaseStudyProps {
  data: CaseStudyData;
}

export default function CaseStudy({ data }: CaseStudyProps) {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#0A0A0A' }}>
      <CaseStudyHero
        title={data.hero.title}
        description={data.hero.description}
        tags={data.hero.tags}
        publishedDate={data.meta.publishedDate}
      />
      <CaseStudyStats
        title={data.stats.title}
        cards={data.stats.cards}
        fullWidthCard={data.stats.fullWidthCard}
      />
      <CaseStudyContent blocks={data.content} />
    </div>
  );
}
