import { CaseStudyCard } from '../case-study-card';
const caseStudies = [
  {
    title: 'Webflow & CRO Expert: 7 Deals/Month',
    description:
      'Webflow expert transforms his Upwork strategy with our funnel system, achieving 38% open rates, 23% reply rates, and averaging 7 contracts per month worth $35K in total value.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnikola.png?alt=media&token=63b480b5-aede-434a-8cac-749ba9b2a6ec',
    readMoreUrl: '/case-studies/nikola',
  },
  {
    title: '$24K/month Upwork Funnel | iOS & MVP Developer',
    description:
      'Ex-Facebook engineer and iOS development boutique owner transforms his dormant Upwork presence into a $24K/month funnel with 33% open rates and consistent client wins.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fmartin.png?alt=media&token=50a1e004-9be4-4e52-9588-d21e195c9afe',
    readMoreUrl: '/case-studies/martin',
  },
  {
    title: '$40K/month Upwork Funnel | AI Agents & Automation Expert',
    description:
      'Fast-growing agency owner automates his Upwork outreach with 400 proposals/month, achieving 34% open rates, 15% reply rates, and $40K monthly revenue while reclaiming 10 hours per week.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fnando.png?alt=media&token=96f2ef26-0bbf-475c-a6db-6617c5dcbd35',
    readMoreUrl: '/case-studies/nando',
  },
  {
    title:
      '6 Contracts First Month | Automated Upwork Funnel | Email Marketing',
    description:
      'Veteran Upwork freelancer switches from a failing competitor tool to Lancer, achieving 6 contracts in his first month with 24.5% open rates and 13.2% reply rates.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Farul.png?alt=media&token=4f1d97c8-38b7-4914-b713-50bfd6f361bd',
    readMoreUrl: '/case-studies/arul',
  },

  {
    title: '26% Reply Rate Upwork Funnel | PPC Expert | Meta & Google Ads',
    description:
      'Already successful PPC expert scales his proven approach with AI automation, achieving absolutely bonkers results: 46.4% open rates and 26.1% reply rates on Upwork.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/case-studies%2Fwill.png?alt=media&token=3731a1ea-af3a-4ee8-8e16-4f37e63b9b40',
    readMoreUrl: '/case-studies/will',
  },
];

export default function CaseStudiesView() {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#0A0A0A' }}>
      {/* Header Section with proper spacing for fixed navbar */}
      <section className='relative pt-20 pb-10 lg:pt-40'>
        <div className='mx-auto max-w-7xl px-6 text-center'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'>
            Case Studies
          </h1>
          <p className='mt-6 text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed'>
            Real success stories from freelancers who transformed their Upwork
            careers with Lancer
          </p>
        </div>
      </section>

      {/* Case Studies Content */}
      <section className='py-20'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={index}
                title={caseStudy.title}
                description={caseStudy.description}
                image={caseStudy.image}
                readMoreUrl={caseStudy.readMoreUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
