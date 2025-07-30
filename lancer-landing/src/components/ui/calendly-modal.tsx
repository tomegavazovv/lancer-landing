'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Linkedin, Instagram, Youtube, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import CalendlyEmbed from './calendly-embed';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Testimonials data
const testimonials = [
  {
    quote:
      "Lancer was so effective for us. We were able to close down on three high quality deals in just under two weeks. I had to pause the campaign because we couldn't take on any more work - honestly, that's the best problem I had in years.",
    name: 'Nikola Arsovski',
    designation: 'Top Rated Upworker',
    avatar: '/nikola-headshot.jpeg',
    rating: 5,
  },
  {
    quote:
      'We started using Lancer maybe a month ago, and it has been incredible so far. We were able to get one new client in the first two weeks, which is amazing. The approach feels really genuine.',
    name: 'Martin Peshevski',
    designation: 'Agency Looking to Scale',
    avatar: '/martin-headshot.jpg',
    rating: 5,
  },
  {
    quote:
      "With Lancer, we've been able to send very high quality proposals that simply work. In just two weeks, we landed our first project. It was very easy to set up, and I intend to continue using it.",
    name: 'Ivo Damjanovski',
    designation: 'Just started on Upwork',
    avatar: '/ivo-headshot.jpeg',
    rating: 5,
  },
];

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Testimonials */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 lg:p-8 flex flex-col justify-center">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-xl lg:text-2xl font-semibold text-gray-900">
                High-Quality Deals. Zero Fluff.
              </DialogTitle>
              <p className="text-gray-600 text-sm lg:text-base">
              Freelancers are closing work in just days.
              </p>
            </DialogHeader>

            {/* Testimonial Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 text-base lg:text-lg leading-relaxed">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                    <AvatarFallback>
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{currentTestimonial.name}</div>
                    <div className="text-gray-600 text-sm">{currentTestimonial.designation}</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonialIndex 
                        ? 'bg-blue-600 w-6' 
                        : 'bg-blue-200 hover:bg-blue-300'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Calendly */}
          <div className="lg:w-3/5 bg-white">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/ivan-headshot.png" alt="Ivan" />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                    Book Demo with Ivan
                  </h3>
                  <div className="text-gray-600 text-sm">Founder & CEO</div>
                  <div className="text-gray-500 text-xs mt-1">I'll personally walk you through how Lancer can transform your Upwork success</div>
                </div>
              </div>
              
              {/* Social Media Row */}
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">Find him on:</span>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/ivan-nedlekovski/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/nedelkov.ski/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.youtube.com/@ivan.nedelkovski"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.nedelkov.ski/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-700 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-0">
              <CalendlyEmbed
                url="https://calendly.com/ivan-mvp/lancer-1-1-demo-call"
                minimal={true}
                height={520}
                backgroundColor="ffffff"
                primaryColor="3b82f6"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 