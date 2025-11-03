import React from 'react';
import { Highlight } from '@/components/ui/hero-highlight';
import Image from 'next/image';

function MeetingBookedStat({ value, color }: { value: string; color: string }) {
  return (
    <>
      <div className="w-full border-t border-gray-200 my-4" />
      <div className={`text-xl md:text-2xl lg:text-3xl font-extrabold mt-2 mb-0 ${color}`}
        style={{ letterSpacing: '-0.01em' }}
      >
        {value} <span className="text-sm md:text-base font-semibold text-gray-500 ml-1">per meeting booked</span>
      </div>
    </>
  );
}

export default function SalesPitch1() {
  return (
    <section className="py-16 px-4 md:px-0">
      <div className="max-w-6xl mx-auto border border-border bg-white/80 dark:bg-muted/60 shadow-sm rounded-3xl p-4 md:p-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 text-gray-900">
            The Lowest Cost Per Meeting Booked In The Game
          </h2>
          <p className="text-base md:text-lg mb-4 text-muted-foreground">
            Hire the best Upwork AI Agent and let it outcompete every SDR on the planet.
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mt-6 md:mt-8">
          {/* WITHOUT LANCER */}
          <div className="bg-white border-0 border-grey-300 shadow-[0_4px_32px_0_rgba(00,00,00,0.15)] ring-1 ring-[#F86367]/20 rounded-2xl p-4 md:p-8 w-full max-w-[420px] mx-auto transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_48px_0_rgba(00,00,00,0.25)]">
            <div className="flex w-full items-center">
              {/* Left: Heading and subheading */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Without Lancer</h3>
                <div className="text-xs md:text-sm text-gray-600 mb-4">Jobs missed, hours wasted, high cost per meeting booked</div>
              </div>
              {/* Right: Icon */}
              <div className="flex items-center justify-center ml-2 md:ml-4">
                <Image src="/lancer-logo-transaprent.svg" alt="Transparent Lancer Icon" width={40} height={40} className="md:w-[60px] md:h-[60px]" />
              </div>
            </div>
            <div className="w-full border-b border-gray-200 mb-4" />
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700 w-full">
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg><span><span className="text-red-600 font-semibold">90%</span> of Upwork opportunities missed</span></li>
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg><span><span className="text-red-600 font-semibold">4</span> hours a day wasted</span></li>
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span><span className="text-red-600 font-semibold">20%</span> open rate</span></li>
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg><span><span className="text-red-600 font-semibold">10%</span> reply rate</span></li>
            </ul>
            <MeetingBookedStat value="$98.08" color="text-red-600" />
          </div>
          {/* VS CIRCLE */}
          <div className="z-10 flex items-center justify-center my-4 md:my-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-gray-900 text-gray-900 text-xl md:text-3xl font-bold">
              VS
            </div>
          </div>
          {/* WITH LANCER */}
          <div className="bg-white border-2 border-[#3DDF72] shadow-[0_4px_32px_0_rgba(61,223,114,0.15)] ring-1 ring-[#3DDF72]/20 rounded-2xl p-4 md:p-8 w-full max-w-[420px] mx-auto transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_48px_0_rgba(61,223,114,0.25)]">
            <div className="flex w-full items-center">
              {/* Left: Heading and subheading */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">With Lancer</h3>
                <div className="text-xs md:text-sm text-gray-600 mb-4">Zero jobs missed, zero hours wasted, the best conversion rate in the game</div>
              </div>
              {/* Right: Icon */}
              <div className="flex items-center justify-center ml-2 md:ml-4">
                <Image src="/lancer-black-red-icon.svg" alt="Lancer Black Red Icon" width={40} height={40} className="md:w-[60px] md:h-[60px]" />
              </div>
            </div>
            <div className="w-full border-b border-gray-200 mb-4" />
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700 w-full">
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg><span><span className="text-green-600 font-semibold">0%</span> of Upwork opportunities missed</span></li>
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg><span><span className="text-green-600 font-semibold">0</span> hours a day wasted</span></li>
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span><span className="text-green-600 font-semibold">60%</span> open rate</span></li>
              <li className="flex items-center"><svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg><span><span className="text-green-600 font-semibold">21.8%</span> reply rate</span></li>
            </ul>
            <MeetingBookedStat value="$20.02" color="text-green-600" />
          </div>
        </div>
      </div>
    </section>
  );
} 