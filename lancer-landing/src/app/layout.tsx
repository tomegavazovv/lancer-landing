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
  title: 'Lancer - AI-Powered Upwork Automation | Win More Jobs Automatically',
  description:
    'Stop chasing work and start winning it. Lancer is an AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Trusted by 1,247+ successful professionals.',
  manifest: '/manifest.json',
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
      'Lancer - AI-Powered Upwork Automation | Win More Jobs Automatically',
    description:
      'Stop chasing work and start winning it. Lancer is an AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Trusted by 1,247+ successful professionals.',
    images: [
      {
        url: '/product.png', // Using your existing product screenshot
        width: 2700,
        height: 1440,
        alt: 'Lancer AI Upwork Automation Dashboard - Automated Job Bidding and Proposal Generation',
      },
      {
        url: '/web-app-manifest-512x512.png', // Fallback square image
        width: 512,
        height: 512,
        alt: 'Lancer Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lancer', // Replace with your actual Twitter handle
    creator: '@lancer', // Replace with your actual Twitter handle
    title:
      'Lancer - AI-Powered Upwork Automation | Win More Jobs Automatically',
    description:
      'Stop chasing work and start winning it. Lancer finds perfect Upwork jobs and submits personalized proposals automatically. Join 1,247+ successful professionals.',
    images: ['/product.png'],
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
        <Script
          id='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://lancer.app',
              name: 'Lancer',
              description:
                'Stop chasing work and start winning it. Lancer is an AI agent that finds perfect Upwork jobs and submits personalized proposals automatically. Trusted by 1,247+ successful professionals.',
              image: '/product.png',
            }),
          }}
        />
        <Script id="hotjar-init" strategy="afterInteractive">
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
        <Script id="rb2b-init" strategy="afterInteractive">
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
          id="tolt-affiliate-tracking"
          src="https://cdn.tolt.io/tolt.js"
          data-tolt="pk_kF4zkzLaaTifeVEbiMbPJkdb"
          strategy="afterInteractive"
        />
        <Script
          id="analytics-tracking"
          src="https://datafa.st/js/script.js"
          data-website-id="68ceaf857210f2ab3906b5dc"
          data-domain="lancer.app"
          defer
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
