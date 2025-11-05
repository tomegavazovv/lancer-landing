'use client';

import { Footer } from '@/components/blocks/footer';
import { Navbar } from '@/components/blocks/navbar';

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleBookDemo = () => {
    // Add your book demo logic here
    console.log('Book demo clicked');
  };

  const handleGetStarted = () => {
    // Add your get started logic here
    console.log('Get started clicked');
  };

  return (
    <div className='bg-[#0A0A0A] min-h-screen'>
      <Navbar
        isOverDarkSection={true}
        onBookDemo={handleBookDemo}
        onGetStarted={handleGetStarted}
      />
      {children}
      <Footer />
    </div>
  );
}
