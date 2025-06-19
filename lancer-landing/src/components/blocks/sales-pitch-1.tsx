import React from 'react';
import { Highlight } from '@/components/ui/hero-highlight';
import Image from 'next/image';

function MeetingBookedStat({ value, color, darkBg }: { value: string; color: string; darkBg?: boolean }) {
  return (
    <>
      <div className={`w-full border-t ${darkBg ? 'border-[#23232a]' : 'border-gray-200'} my-4`} />
      <div className={`text-2xl md:text-3xl font-extrabold mt-2 mb-0 ${color} ${darkBg ? '' : ''}`}
        style={{ letterSpacing: '-0.01em' }}
      >
        {value} <span className="text-base font-semibold text-gray-400 ml-1">per meeting booked</span>
      </div>
    </>
  );
}

export default function SalesPitch1({ darkBg = false }: { darkBg?: boolean }) {
  return (
    <section className={darkBg ? 'py-16 px-4 md:px-0 text-white' : 'bg-white py-16 px-4 md:px-0'}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${darkBg ? 'text-white' : 'text-gray-900'}`}>
            The Lowest Cost Per Meeting Booked In The Game
          </h2>
          <p className={`text-lg mb-4 ${darkBg ? 'text-gray-300' : 'text-muted-foreground'}`}>
            Hire the best Upwork AI Agent and let it outcompete every SDR on the planet.
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 mt-8">
          {/* WITHOUT LANCER */}
          <div className="bg-[#18181b] border border-[#F86367] shadow-[0_4px_32px_0_rgba(248,99,103,0.15)] ring-1 ring-[#F86367]/30 rounded-2xl p-8 flex-1 flex flex-col items-start min-w-[320px] max-w-[420px] mx-auto transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_48px_0_rgba(248,99,103,0.25)] hover:bg-gradient-to-br hover:from-[#23232a] hover:to-[#18181b]">
            <div className="flex w-full items-center">
              {/* Left: Heading and subheading */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-1">Without Lancer</h3>
                <div className="text-sm text-gray-400 mb-4">Jobs missed, hours wasted, high cost per meeting booked</div>
              </div>
              {/* Right: Icon */}
              <div className="flex items-center justify-center ml-4">
                <Image src="/lancer-depressed-icon.svg" alt="Depressed Lancer Icon" width={60} height={60} />
              </div>
            </div>
            <div className="w-full border-b border-[#23232a] mb-4" />
            <ul className="space-y-4 text-base text-gray-200 w-full">
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg><span><span className="text-red-400 font-semibold">90%</span> of Upwork opportunities missed</span></li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg><span><span className="text-red-400 font-semibold">4</span> hours a day wasted</span></li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span><span className="text-red-400 font-semibold">20%</span> open rate</span></li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg><span><span className="text-red-400 font-semibold">10%</span> reply rate</span></li>
            </ul>
            <MeetingBookedStat value="$150" color="text-red-400" darkBg />
          </div>
          {/* VS CIRCLE */}
          <div className="z-10 flex items-center justify-center my-6 md:my-0">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white text-3xl font-bold">
              VS
            </div>
          </div>
          {/* WITH LANCER */}
          <div className="bg-[#18181b] border border-[#3DDF72] shadow-[0_4px_32px_0_rgba(61,223,114,0.15)] ring-1 ring-[#3DDF72]/30 rounded-2xl p-8 flex-1 flex flex-col items-start min-w-[320px] max-w-[420px] mx-auto transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_48px_0_rgba(61,223,114,0.25)] hover:bg-gradient-to-br hover:from-[#23232a] hover:to-[#18181b]">
            <div className="flex w-full items-center">
              {/* Left: Heading and subheading */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-1">With Lancer</h3>
                <div className="text-sm text-gray-400 mb-4">Zero jobs missed, zero hours wasted, the best conversion rate in the game</div>
              </div>
              {/* Right: Icon */}
              <div className="flex items-center justify-center ml-4">
                <Image src="/lancer-white-red-icon.svg" alt="Lancer White Red Icon" width={60} height={60} />
              </div>
            </div>
            <div className="w-full border-b border-[#23232a] mb-4" />
            <ul className="space-y-4 text-base text-gray-200 w-full">
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg><span><span className="text-green-400 font-semibold">0%</span> of Upwork opportunities missed</span></li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg><span><span className="text-green-400 font-semibold">0</span> hours a day wasted</span></li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span><span className="text-green-400 font-semibold">55%</span> open rate</span></li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg><span><span className="text-green-400 font-semibold">33.7%</span> reply rate</span></li>
            </ul>
            <MeetingBookedStat value="$20.02" color="text-green-400" darkBg />
          </div>
        </div>
      </div>
    </section>
  );
} 