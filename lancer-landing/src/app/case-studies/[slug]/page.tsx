import ArulCaseStudy from '@/sections/case-studies/arul';
import MartinCaseStudy from '@/sections/case-studies/martin';
import NandoCaseStudy from '@/sections/case-studies/nando';
import NikolaCaseStudy from '@/sections/case-studies/nikola';
import WillCaseStudy from '@/sections/case-studies/will';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === 'nikola') {
    return <NikolaCaseStudy />;
  } else if (slug === 'martin') {
    return <MartinCaseStudy />;
  } else if (slug === 'nando') {
    return <NandoCaseStudy />;
  } else if (slug === 'arul') {
    return <ArulCaseStudy />;
  } else if (slug === 'will') {
    return <WillCaseStudy />;
  }
  return null;
}
