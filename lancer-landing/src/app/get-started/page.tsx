'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CalendlyEmbed from '@/components/ui/calendly-embed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlavorDesignLogo from '@/components/ui/flavor-design-logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoIcon } from '@/components/ui/logo-icon';
import { MultiSelect } from '@/components/ui/multi-select';
import MvpMastersLogo from '@/components/ui/mvp-masters-logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import WolfwareLogo from '@/components/ui/wolfware-logo';
import { Building2, CircleCheck, UserRound, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

// Company logos for trusted by section
const trustedByLogos = [
  { name: 'ellar', src: '/logos/ellar.png' },
  { name: 'Rho', src: '/logos/rho.png' },
  { name: 'Route', src: '/logos/route.png' },
  { name: 'Io', src: '/logos/io.png' },
  { name: 'Mvp Masters', src: '/logos/mvp-masters.png' },
  { name: 'Flavor Design', src: '/logos/flavor-design.png' },
];

// Helper function to render logo based on name
const renderLogo = (logo: { name: string; src: string }) => {
  switch (logo.name) {
    case 'ellar':
      return (
        <div className='w-[100px] h-[30px] flex items-center justify-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <WolfwareLogo size={80} />
          </div>
        </div>
      );
    case 'Rho':
      return (
        <div className='w-[100px] h-[30px] flex items-center justify-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Image
              src='https://cdn.prod.website-files.com/671fb8d713014f9726315b4a/6750028003927e9683f8ad7e_TinyPNG%20Logo.png'
              alt='Flowscape Logo'
              className='contrast-80 object-contain'
              width={80}
              height={20}
            />
          </div>
        </div>
      );
    case 'Route':
      return (
        <div className='w-[100px] h-[30px] flex items-center justify-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Image
              src='https://smartclick.agency/wp-content/uploads/2025/01/smartclick-logo.svg'
              alt='SmartClick Logo'
              className='contrast-80 object-contain'
              width={80}
              height={18}
            />
          </div>
        </div>
      );
    case 'Mvp Masters':
      return (
        <div className='w-[100px] h-[30px] flex items-center justify-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <MvpMastersLogo size={80} />
          </div>
        </div>
      );
    case 'Flavor Design':
      return (
        <div className='w-[100px] h-[30px] flex items-center justify-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <FlavorDesignLogo size={logo.name === 'Flavor Design' ? 60 : 50} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Stepper Component
const Stepper = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  return (
    <div className='flex items-center justify-center mb-8'>
      <div className='flex items-center space-x-2'>
        {Array.from({ length: totalSteps }, (_, index) => {
          const dashNumber = index + 1;
          const isActive = dashNumber <= currentStep;

          return (
            <div
              key={index}
              className={`w-8 h-1 rounded-full ${
                isActive ? 'bg-foreground' : 'bg-muted'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [budgetValue, setBudgetValue] = useState(2500);
  const [outreachType, setOutreachType] = useState('');
  const [usesUpwork, setUsesUpwork] = useState('');
  const [nonUpworkChannels, setNonUpworkChannels] = useState<string[]>([]);
  const [upworkReasons, setUpworkReasons] = useState<string[]>([]);

  // Options for outreach channels
  const outreachChannelOptions = [
    { label: 'Cold Email', value: 'cold-email' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Referrals/Word of Mouth', value: 'referrals' },
    { label: 'Social Media', value: 'social-media' },
    { label: 'Networking Events', value: 'networking-events' },
    { label: 'Content Marketing', value: 'content-marketing' },
    { label: 'Other Freelance Platforms', value: 'other-freelance-platforms' },
    { label: "I don't do active outreach", value: 'none' },
    { label: 'Other', value: 'other' },
  ];

  // Options for reasons not using Upwork
  const upworkReasonOptions = [
    { label: 'Too competitive', value: 'too-competitive' },
    {
      label: 'Perception of low-quality clients',
      value: 'low-quality-clients',
    },
    { label: 'Platform fees are too high', value: 'fees-too-high' },
    { label: "Don't know how to get started", value: 'dont-know-how' },
    {
      label: "Tried before but wasn't successful",
      value: 'tried-unsuccessfully',
    },
    {
      label: 'Current channels are working well',
      value: 'current-channels-working',
    },
    { label: 'Seems too time-consuming', value: 'time-consuming' },
    { label: 'Other reason', value: 'other' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className='border-1 shadow-none'>
            <CardHeader className='pb-6'>
              {/* Stepper inside the card */}
              <Stepper currentStep={currentStep} totalSteps={totalSteps} />

              <div className='flex items-center gap-4 mb-4'>
                <CardTitle className='text-xl font-normal'>
                  Step 1: Basic Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-normal'>
                  Company email <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='tome@mvpmasters.co'
                  className='text-sm'
                  defaultValue='tome@mvpmasters.co'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='role' className='text-sm font-normal'>
                  Your Role/Position <span className='text-red-500'>*</span>
                </Label>
                <Select>
                  <SelectTrigger className='text-sm'>
                    <SelectValue placeholder='Choose an option...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='freelancer'>Freelancer</SelectItem>
                    <SelectItem value='agency-owner'>Agency Owner</SelectItem>
                    <SelectItem value='team-lead'>
                      Upwork Outreach Specialist
                    </SelectItem>
                    <SelectItem value='team-lead'>Sales </SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='pt-6 flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'></span>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className='border-1 shadow-none'>
            <CardHeader className='pb-6'>
              {/* Stepper inside the card */}
              <Stepper currentStep={currentStep} totalSteps={totalSteps} />

              <div className='flex items-center gap-4 mb-4'>
                <CardTitle className='text-xl font-normal'>
                  Step 2: Company Details
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='company-name' className='text-sm font-normal'>
                  Company Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='company-name'
                  type='text'
                  placeholder='Your Company Inc.'
                  className='text-sm'
                />
              </div>

              <div className=''>
                <div className='space-y-2'>
                  <Label htmlFor='team-size' className='text-sm font-normal'>
                    Size of your company <span className='text-red-500'>*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className='text-sm'>
                      <SelectValue placeholder='Select size of your company...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1-5'>1-5 people</SelectItem>
                      <SelectItem value='6-10'>6-10 people</SelectItem>
                      <SelectItem value='11-25'>11-25 people</SelectItem>
                      <SelectItem value='26-50'>26-50 people</SelectItem>
                      <SelectItem value='50+'>50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='pt-6 flex items-center justify-between'>
                <Button
                  variant='ghost'
                  onClick={handleBack}
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className='border-1 shadow-none'>
            <CardHeader className='pb-6'>
              {/* Stepper inside the card */}
              <Stepper currentStep={currentStep} totalSteps={totalSteps} />

              <div className='flex items-center gap-4 mb-4'>
                <CardTitle className='text-xl font-normal'>
                  Step 3: Upwork Usage
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-8'>
              <div className='space-y-4'>
                <Label className='text-sm font-normal'>
                  Do you currently use Upwork for client outreach?{' '}
                  <span className='text-red-500'>*</span>
                </Label>

                <div className='flex space-x-1 bg-muted p-1 mt-2 rounded-lg'>
                  <button
                    type='button'
                    onClick={() => setUsesUpwork('yes')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer border ${
                      usesUpwork === 'yes'
                        ? 'bg-background text-foreground shadow-sm border-foreground/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border-transparent'
                    }`}
                  >
                    Yes, I use Upwork
                  </button>
                  <button
                    type='button'
                    onClick={() => setUsesUpwork('no')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer border ${
                      usesUpwork === 'no'
                        ? 'bg-background text-foreground shadow-sm border-foreground/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border-transparent'
                    }`}
                  >
                    No, I don't use Upwork
                  </button>
                </div>
              </div>

              <div className='pt-6 flex items-center justify-between'>
                <Button
                  variant='ghost'
                  onClick={handleBack}
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!usesUpwork}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        if (usesUpwork === 'yes') {
          return (
            <Card className='border-1 shadow-none'>
              <CardHeader className='pb-6'>
                {/* Stepper inside the card */}
                <Stepper currentStep={currentStep} totalSteps={totalSteps} />

                <div className='flex items-center gap-4 mb-4'>
                  <CardTitle className='text-xl font-normal'>
                    Step 4: Upwork Budgeting
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className='space-y-8'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='contract-value'
                    className='text-sm font-normal'
                  >
                    What is your average Upwork contract value?{' '}
                    <span className='text-red-500'>*</span>
                  </Label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
                      $
                    </span>
                    <Input
                      id='contract-value'
                      type='number'
                      placeholder='10000'
                      className='text-sm pl-8'
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <Label className='text-sm font-normal'>
                    Who handles your Upwork outreach?{' '}
                    <span className='text-red-500'>*</span>
                  </Label>

                  <div className='flex space-x-1 bg-muted p-1 rounded-lg'>
                    <button
                      type='button'
                      onClick={() => setOutreachType('myself')}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer border ${
                        outreachType === 'myself'
                          ? 'bg-background text-foreground shadow-sm border-foreground/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border-transparent'
                      }`}
                    >
                      I do it myself
                    </button>
                    <button
                      type='button'
                      onClick={() => setOutreachType('someone-else')}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer border ${
                        outreachType === 'someone-else'
                          ? 'bg-background text-foreground shadow-sm border-foreground/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border-transparent'
                      }`}
                    >
                      Someone else
                    </button>
                  </div>
                </div>

                {outreachType === 'myself' ? (
                  <div className='space-y-2'>
                    <Label
                      htmlFor='hours-per-week'
                      className='text-sm font-normal'
                    >
                      How many hours per week do you spend on Upwork outreach?{' '}
                      <span className='text-red-500'>*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className='text-sm'>
                        <SelectValue placeholder='Choose an option...' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1-5'>1-5 hours</SelectItem>
                        <SelectItem value='6-10'>6-10 hours</SelectItem>
                        <SelectItem value='11-20'>11-20 hours</SelectItem>
                        <SelectItem value='21-30'>21-30 hours</SelectItem>
                        <SelectItem value='30+'>30+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  outreachType === 'someone-else' && (
                    <div className='space-y-4'>
                      <Label className='text-sm font-normal'>
                        What's your approximate monthly investment in outreach
                        personnel?
                        <span className='text-red-500'>*</span>
                      </Label>

                      <div className='space-y-4 mt-2'>
                        <div className='text-center'>
                          <div className='text-md font-medium mb-4'>
                            ${budgetValue.toLocaleString()}
                          </div>
                          <div className='relative'>
                            <Slider
                              value={[budgetValue]}
                              onValueChange={(value) =>
                                setBudgetValue(value[0] as number)
                              }
                              max={5000}
                              min={500}
                              step={500}
                            />
                          </div>
                          <div className='flex justify-between text-xs text-muted-foreground mt-2'>
                            <span>$500 or less</span>
                            <span>$5,000 or more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                <div className='pt-6 flex items-center justify-between'>
                  <Button
                    variant='ghost'
                    onClick={handleBack}
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Back
                  </Button>
                  <Button onClick={() => setIsSubmitted(true)}>Submit</Button>
                </div>
              </CardContent>
            </Card>
          );
        } else {
          return (
            <Card className='border-1 shadow-none'>
              <CardHeader className='pb-6'>
                {/* Stepper inside the card */}
                <Stepper currentStep={currentStep} totalSteps={totalSteps} />

                <div className='flex items-center gap-4 mb-4'>
                  <CardTitle className='text-xl font-normal'>
                    Step 4: Current Outreach Strategy
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className='space-y-8'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='current-channels'
                    className='text-sm font-normal'
                  >
                    What channels do you currently use for client outreach?{' '}
                    <span className='text-red-500'>*</span>
                  </Label>
                  <MultiSelect
                    value={nonUpworkChannels}
                    onValueChange={setNonUpworkChannels}
                    options={outreachChannelOptions}
                    placeholder='Select your outreach channels...'
                  />
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='upwork-reason'
                    className='text-sm font-normal'
                  >
                    Why haven't you tried Upwork or are not currently using it?{' '}
                    <span className='text-red-500'>*</span>
                  </Label>
                  <MultiSelect
                    value={upworkReasons}
                    onValueChange={setUpworkReasons}
                    options={upworkReasonOptions}
                    placeholder='Choose your reasons...'
                  />
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='avg-contract-value'
                    className='text-sm font-normal'
                  >
                    What is your average contract value?{' '}
                    <span className='text-red-500'>*</span>
                  </Label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
                      $
                    </span>
                    <Input
                      id='avg-contract-value'
                      type='number'
                      placeholder='10000'
                      className='text-sm pl-8'
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <Label className='text-sm font-normal'>
                    What's your approximate monthly investment in client
                    outreach?
                    <span className='text-red-500'>*</span>
                  </Label>

                  <div className='space-y-4 mt-2'>
                    <div className='text-center'>
                      <div className='text-md font-medium mb-4'>
                        ${budgetValue.toLocaleString()}
                      </div>
                      <div className='relative'>
                        <Slider
                          value={[budgetValue]}
                          onValueChange={(value) =>
                            setBudgetValue(value[0] as number)
                          }
                          max={5000}
                          min={500}
                          step={500}
                        />
                      </div>
                      <div className='flex justify-between text-xs text-muted-foreground mt-2'>
                        <span>$500 or less</span>
                        <span>$5,000 or more</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pt-6 flex items-center justify-between'>
                  <Button
                    variant='ghost'
                    onClick={handleBack}
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Back
                  </Button>
                  <Button onClick={() => setIsSubmitted(true)}>Submit</Button>
                </div>
              </CardContent>
            </Card>
          );
        }

      default:
        return null;
    }
  };

  const renderSuccessContent = () => {
    return (
      <Card className='border-1 shadow-sm'>
        <CardContent className='p-8'>
          <div className='flex flex-col lg:flex-row gap-8 items-start'>
            {/* Left side - Success message */}
            <div className='w-full lg:w-1/2 space-y-8'>
              <div className='flex gap-3  mb-6'>
                <CircleCheck className='w-10 h-10 text-green-600' />
                <div>
                  <div className='flex items-center gap-3  mb-6'>
                    <h2 className='text-xl '>You're a great fit!</h2>
                  </div>

                  <div className='space-y-3'>
                    <p className='text-md text-muted-foreground'>
                      Based on your answers, Lancer looks like a great match for
                      your needs.
                    </p>
                    <p className='text-md text-muted-foreground'>
                      Your request has been accepted. Book a time in the
                      calendar to speak with a Lancer specialist.
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-6 pt-4 p-10 rounded-lg shadow-sm border border-border/20'>
                <div className=''>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm   uppercase tracking-wider'>
                      SUBMISSION DETAILS
                    </p>
                    <Badge className='bg-green-200 text-xs text-green-900'>
                      Approved
                    </Badge>
                  </div>
                  <div className='space-y-2 mt-4'>
                    <div className='flex items-center gap-2'></div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex gap-3'>
                    <UserRound className='w-5 h-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm  text-muted-foreground'>CONTACT</p>
                      <p className='text-sm'>Sales at Mvp masters</p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Building2 className='w-5 h-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm  text-muted-foreground'>
                        ORGANIZATION
                      </p>
                      <p className='text-sm'>Mvp masters </p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Users className='w-5 h-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm  text-muted-foreground'>
                        TEAM SIZE
                      </p>
                      <p className='text-sm'>25 employees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-1/2 space-y-4 rounded-lg shadow-sm border border-border/20'>
              <div className='flex items-center justify-between mb-4'></div>

              <div className='w-full'>
                <CalendlyEmbed
                  url='https://calendly.com/tome-mvpmasters/30min'
                  minimal={true}
                  height={700}
                  backgroundColor='ffffff'
                  primaryColor='3b82f6'
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}

      {/* Main Content */}
      <main className='mx-auto max-w-7xl px-6 py-16'>
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          {!isSubmitted ? (
            <>
              <div className='mb-16 mt-10'>
                <h1 className='text-7xl md:text-7xl  mb-6'>Get Started</h1>
              </div>

              <div className='flex flex-col lg:flex-row gap-8 items-start'>
                {/* Left side - Testimonial */}
                <div className='w-full lg:w-2/5 space-y-8'>
                  <div className=''>
                    <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                      / TESTIMONIAL
                    </p>
                    <hr className='mt-2' />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                      <Avatar className='w-16 h-16'>
                        <AvatarImage
                          src='https://cdn.prod.website-files.com/68179ca71ec155a244188f61/68190c9c64f9228f0ca216d6_855ea39788361cdaf07ae0f063d7c9899c742f6f.png'
                          alt='Iddo Gino'
                        />
                        <AvatarFallback>IG</AvatarFallback>
                      </Avatar>
                      <div>
                        <blockquote className='text-lg  leading-relaxed'>
                          "I had to pause the campaign because we couldn't take
                          on any more work"
                        </blockquote>
                        <p className='text-sm text-muted-foreground'>
                          Nikola Arsovski, Top Rated Upworker
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trusted By Section */}
                  <div className='space-y-4'>
                    <div className=''>
                      <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        / TRUSTED BY
                      </p>
                      <hr className='mt-2' />
                    </div>

                    <div className='relative w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
                      <div className='flex items-center justify-center md:justify-start [&>div]:mx-8 animate-marquee group-hover:[animation-play-state:paused] [--duration:25s]'>
                        {trustedByLogos.map((logo, i) => (
                          <div
                            key={i}
                            className='flex items-center justify-center opacity-60 hover:opacity-80 transition-opacity'
                          >
                            {renderLogo(logo)}
                          </div>
                        ))}
                      </div>
                      <div
                        className='flex items-center justify-center md:justify-start [&>div]:mx-8 animate-marquee group-hover:[animation-play-state:paused] [--duration:25s] h-[30px]'
                        aria-hidden='true'
                      >
                        {trustedByLogos.map((logo, i) => (
                          <div
                            key={`duplicate-${i}`}
                            className='flex items-center justify-center opacity-60 hover:opacity-80 transition-opacity'
                          >
                            {renderLogo(logo)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Form */}
                <div className='w-full lg:w-3/5 space-y-8'>
                  <div className=''>
                    <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                      / REQUEST
                    </p>
                    <hr className='mt-2' />
                  </div>

                  {renderStepContent()}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='text-center mb-12'>
                <div className='flex items-center justify-center mb-6'>
                  <Link href='/'>
                    <LogoIcon size={60} />
                  </Link>
                </div>
                <h1 className='text-2xl md:text-3xl  mb-4'>
                  Book a demo with Lancer Specialist
                </h1>
              </div>
              {renderSuccessContent()}
            </>
          )}
        </AnimatedGroup>
      </main>
    </div>
  );
}
