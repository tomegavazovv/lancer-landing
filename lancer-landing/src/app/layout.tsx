import { QueryProvider } from '@/providers/query-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lancer.app'),
  title: 'Lancer - Upwork AI Agent | Win More Jobs Automatically',
  description:
    'Stop chasing work and start winning it. Lancer is an AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Trusted by 1,247+ successful professionals.',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Upwork automation',
    'AI freelancing',
    'Upwork proposals',
    'freelancer tools',
    'job bidding automation',
    'Upwork AI agent',
    'freelance productivity',
    'automated outreach',
  ],
  authors: [{ name: 'Lancer' }],
  creator: 'Lancer',
  publisher: 'Lancer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: '/icon0.svg' }, { url: '/icon1.png' }],
    apple: [{ url: '/apple-icon.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lancer.app', // Replace with your actual domain
    siteName: 'Lancer',
    title:
      'Lancer - Upwork AI Agent | Win More Jobs Automatically',
    description:
      'Stop chasing work and start winning it. Lancer is an AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Trusted by 1,247+ successful professionals.',
    images: [
      {
        url: '/og-image.png',
        width: 1268,
        height: 923,
        alt: 'Lancer - The #1 Upwork AI Agent. Land Upwork jobs 24/7 without the grind.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lancer', // Replace with your actual Twitter handle
    creator: '@lancer', // Replace with your actual Twitter handle
    title:
      'Lancer - Upwork AI Agent | Win More Jobs Automatically',
    description:
      'Stop chasing work and start winning it. Lancer finds perfect Upwork jobs and submits personalized proposals automatically. Join 1,247+ successful professionals.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them:
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-5KSZJ7PJWX'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5KSZJ7PJWX');
          `}
        </Script>
        {/* Google Ads conversion tracking */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=AW-11262946363'
          strategy='afterInteractive'
        />
        <Script id='google-ads' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11262946363');
          `}
        </Script>
        <Script
          id='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://lancer.app/#website',
                  url: 'https://lancer.app',
                  name: 'Lancer',
                  description:
                    'Stop chasing work and start winning it. Lancer is an AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Trusted by 1,247+ successful professionals.',
                  image: {
                    '@type': 'ImageObject',
                    url: 'https://lancer.app/product.png',
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate:
                        'https://lancer.app/search?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://lancer.app/#organization',
                  name: 'Lancer',
                  url: 'https://lancer.app',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://lancer.app/lancer-logo-transaprent.svg',
                  },
                  description:
                    'AI-powered Upwork automation platform that helps freelancers and agencies win more jobs automatically.',
                  sameAs: ['https://twitter.com/lancer'],
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': 'https://lancer.app/#software',
                  name: 'Lancer',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  offers: [
                    {
                      '@type': 'Offer',
                      name: 'Light Plan',
                      price: '209',
                      priceCurrency: 'USD',
                      priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '209',
                        priceCurrency: 'USD',
                        billingDuration: 'P1M',
                      },
                    },
                    {
                      '@type': 'Offer',
                      name: 'Unlimited Plan',
                      price: '349',
                      priceCurrency: 'USD',
                      priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '349',
                        priceCurrency: 'USD',
                        billingDuration: 'P1M',
                      },
                    },
                  ],
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5',
                    ratingCount: '11',
                    bestRating: '5',
                    worstRating: '1',
                  },
                  description:
                    'AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Features include AI-based job filtering, unlimited targeted campaigns, personalized cover letter templates, real-time notifications, and advanced analytics.',
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Is Upwork automation allowed?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Upwork prohibits spammy bots that mass-apply to jobs. Lancer is built to stay within Upwork's terms by sending tailored, high-quality proposals based on your profile, skills, and preferences - just like a human would.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How can I be sure that Lancer is safe to use?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Lancer's automation is completely indistinguishable from a real user - from browsing patterns to proposal timing and personalization. We've served 100+ freelancers with zero account issues or flags. Our system is built from the ground up to respect Upwork's terms, using natural human-like behavior and strict quality controls. You're in good hands.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Does using Lancer improve my chances of getting jobs on Upwork?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes - response speed and relevance are key factors on Upwork. Lancer applies faster than a human, with personalized proposals that align with job requirements. That gives you a competitive edge without sacrificing quality.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How does Lancer choose which jobs to apply to?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Lancer uses advanced filters that can evaluate jobs based on 99+ variables - everything from budget and client history to job description quality and requirements match. But we don't stop there. Our AI then reviews each job that passes the filters, just like a human would, to catch those edge cases that technically meet the criteria but are clearly not a good fit. This two-layer approach ensures you only apply to jobs worth your time.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: "Can I still review proposals before they're sent?",
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Yes. You're always in control. You can play around with Lancer's outputs until you are satisfied. However, once you are confident in it's performance we recommend letting Lancer do it's thing on auto-pilot.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What types of freelancers benefit most from Lancer?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Lancer is best suited for: Solo freelancers who want to save time and focus on client work, Agencies who need to scale outreach across multiple accounts, Anyone tired of writing repetitive proposals but still wants to win top jobs.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
        <Script id='hotjar-init' strategy='afterInteractive'>
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6413187,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
        <Script id='rb2b-init' strategy='afterInteractive'>
          {`
            !function(key) {
              if (window.reb2b) return;
              window.reb2b = {loaded: true};
              var s = document.createElement("script");
              s.async = true;
              s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
              document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
            }("Z6PVLHPMY06R");
          `}
        </Script>
        <Script
          id='tolt-affiliate-tracking'
          src='https://cdn.tolt.io/tolt.js'
          data-tolt='pk_kF4zkzLaaTifeVEbiMbPJkdb'
          strategy='afterInteractive'
        />
        <Script
          id='analytics-tracking'
          src='https://datafa.st/js/script.js'
          data-website-id='68ceaf857210f2ab3906b5dc'
          data-domain='lancer.app'
          defer
          strategy='afterInteractive'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
