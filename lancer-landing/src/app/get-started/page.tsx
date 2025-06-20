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
import ReactFlagsSelect from 'react-flags-select';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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

// Form data interface
interface FormData {
  email: string;
  role: string;
  companyName: string;
  teamSize: string;
  usesUpwork: string;
  contractValue: string;
  outreachType: string;
  hoursPerWeek: string;
  budgetValue: number;
  nonUpworkChannels: string[];
  upworkReasons: string[];
  avgContractValue: string;
  agencyName: string;
  location: string;
  upworkUsage: string;
  upworkExperience: string;
  personnelInvestment: string;
}

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Consolidated form state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    role: '',
    companyName: '',
    teamSize: '',
    usesUpwork: '',
    contractValue: '',
    outreachType: '',
    hoursPerWeek: '',
    budgetValue: 1000,
    nonUpworkChannels: [],
    upworkReasons: [],
    avgContractValue: '',
    agencyName: '',
    location: '',
    upworkUsage: '',
    upworkExperience: '',
    personnelInvestment: '',
  });

  // Legacy state for backward compatibility - will be cleaned up
  const [budgetValue, setBudgetValue] = useState(1000);
  const [outreachType, setOutreachType] = useState('');
  const [usesUpwork, setUsesUpwork] = useState('');
  const [nonUpworkChannels, setNonUpworkChannels] = useState<string[]>([]);
  const [upworkReasons, setUpworkReasons] = useState<string[]>([]);

  // Email validation helper function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation functions
  const validateStep1 = (): boolean => {
    return (
      formData.email.trim() !== '' &&
      isValidEmail(formData.email) &&
      formData.role.trim() !== ''
    );
  };

  const validateStep2 = (): boolean => {
    if (formData.teamSize === 'just-me') {
      return formData.teamSize.trim() !== '' && formData.location.trim() !== '';
    }
    return (
      formData.teamSize.trim() !== '' &&
      formData.location.trim() !== '' &&
      formData.agencyName.trim() !== ''
    );
  };

  const validateStep3 = (): boolean => {
    return formData.upworkUsage.trim() !== '' && formData.upworkExperience.trim() !== '';
  };

  const validateStep4 = (): boolean => {
    const hasACV = formData.avgContractValue.trim() !== '';
    const hasBudget = formData.budgetValue >= 300;
    const hasOutreachType = formData.outreachType.trim() !== '';
    if (!hasACV || !hasBudget || !hasOutreachType) return false;
    if (formData.outreachType === 'myself') {
      return formData.hoursPerWeek.trim() !== '';
    } else if (formData.outreachType === 'someone-else') {
      return formData.personnelInvestment.trim() !== '';
    }
    return true;
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      default:
        return false;
    }
  };

  // Update form data helper
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Helper functions for formatting display values
  const formatRole = (role: string): string => {
    if (!role) return 'Not specified';
    return role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');
  };

  const formatTeamSize = (size: string): string => {
    if (!size) return 'Not specified';
    return size === '50+' ? '50+ people' : `${size} people`;
  };

  const formatContractValue = (value: string): string => {
    if (!value) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(value));
  };

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    scrollToTop();

    // Simulate processing time (2-4 seconds)
    const processingTime = Math.random() * 2000 + 2000; // 2-4 seconds

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, processingTime);
  };

  const renderLoadingContent = () => {
    return (
      <Card className='border-1 shadow-none'>
        <CardContent className='p-12'>
          <div className='flex flex-col items-center justify-center space-y-6'>
            {/* Loading text */}
            <div className='text-center space-y-2'>
              <h2 className='text-xl font-medium'>
                Processing your request...
              </h2>
            </div>

            {/* Progress dots */}
            <div className='flex space-x-1'>
              <div className='w-2 h-2 bg-foreground rounded-full animate-pulse'></div>
              <div
                className='w-2 h-2 bg-foreground rounded-full animate-pulse'
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className='w-2 h-2 bg-foreground rounded-full animate-pulse'
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
                  Business Email <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Your business email address'
                  className={`text-base sm:text-sm ${
                    formData.email.trim() !== '' &&
                    !isValidEmail(formData.email)
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }`}
                  value={formData.email}
                  required
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
                {formData.email.trim() !== '' &&
                  !isValidEmail(formData.email) && (
                    <p className='text-red-500 text-xs'>
                      Please enter a valid email address
                    </p>
                  )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='role' className='text-sm font-normal'>
                  Which one of these best describes you? <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => updateFormData('role', value)}
                >
                  <SelectTrigger className='text-base sm:text-sm'>
                    <SelectValue placeholder='Choose an option...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='freelancer'>Freelancer</SelectItem>
                    <SelectItem value='agency-owner'>Agency Owner</SelectItem>
                    <SelectItem value='upwork-specialist'>Upwork Outreach Specialist</SelectItem>
                    <SelectItem value='sales'>Sales</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='pt-6 flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'></span>
                <Button onClick={handleNext} disabled={!isStepValid(1)}>
                  Next
                </Button>
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
                  Step 2: Team Details
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='team-size' className='text-sm font-normal'>
                  Team Size <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.teamSize}
                  onValueChange={(value) => updateFormData('teamSize', value)}
                >
                  <SelectTrigger className='text-base sm:text-sm'>
                    <SelectValue placeholder='Select your team size...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='just-me'>Just me</SelectItem>
                    <SelectItem value='2-5'>2 - 5 people</SelectItem>
                    <SelectItem value='6-10'>6 - 10 people</SelectItem>
                    <SelectItem value='11-25'>11 - 25 people</SelectItem>
                    <SelectItem value='26-50'>26 - 50 people</SelectItem>
                    <SelectItem value='50+'>50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.teamSize !== 'just-me' && (
                <div className='space-y-2'>
                  <Label htmlFor='agency-name' className='text-sm font-normal'>
                    Agency Name <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='agency-name'
                    type='text'
                    placeholder='Your agency name'
                    className='text-base sm:text-sm'
                    value={formData.agencyName}
                    onChange={(e) => updateFormData('agencyName', e.target.value)}
                  />
                </div>
              )}

              <div className='space-y-2'>
                <Label htmlFor='location' className='text-sm font-normal'>
                  Location <span className='text-red-500'>*</span>
                </Label>
                <ReactFlagsSelect
                  selected={formData.location}
                  onSelect={(code: string) => updateFormData('location', code)}
                  searchable
                  searchPlaceholder='Type to search countries'
                  placeholder='Select your country...'
                  className='w-full'
                />
              </div>

              <div className='pt-6 flex items-center justify-between'>
                <Button
                  variant='ghost'
                  onClick={handleBack}
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid(2)}>
                  Next
                </Button>
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
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='upwork-usage' className='text-sm font-normal'>
                  How do you use Upwork? <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.upworkUsage}
                  onValueChange={(value) => updateFormData('upworkUsage', value)}
                >
                  <SelectTrigger className='text-base sm:text-sm'>
                    <SelectValue placeholder='Choose an option...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='consistent'>I use Upwork consistently to close deals</SelectItem>
                    <SelectItem value='seasonal'>I use Upwork seasonally when my usual pipeline of clients dries up, or am in between projects</SelectItem>
                    <SelectItem value='new'>I am new to Upwork and want to validate it as a sales channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='upwork-experience' className='text-sm font-normal'>
                  Your experience with Upwork so far? <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.upworkExperience}
                  onValueChange={(value) => updateFormData('upworkExperience', value)}
                >
                  <SelectTrigger className='text-base sm:text-sm'>
                    <SelectValue placeholder='Choose an option...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='new'>New to Upwork (Yet to close a deal)</SelectItem>
                    <SelectItem value='rookie'>Upwork Rookie (at least one deal closed, but less than $1,000 in lifetime earnings)</SelectItem>
                    <SelectItem value='expert'>Upwork Expert (over $5,000 in lifetime earnings)</SelectItem>
                    <SelectItem value='pro'>Upwork Pro (over $10,000 in lifetime earnings)</SelectItem>
                    <SelectItem value='all-star'>Upwork All-Star (over $100,000 in lifetime earnings)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='pt-6 flex items-center justify-between'>
                <Button
                  variant='ghost'
                  onClick={handleBack}
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid(3)}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className='border-1 shadow-none'>
            <CardHeader className='pb-6'>
              {/* Stepper inside the card */}
              <Stepper currentStep={currentStep} totalSteps={totalSteps} />

              <div className='flex items-center gap-4 mb-4'>
                <CardTitle className='text-xl font-normal'>
                  Step 4: Budgeting
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='avg-contract-value' className='text-sm font-normal'>
                  Your Average Contract Value (ACV) <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.avgContractValue}
                  onValueChange={(value) => updateFormData('avgContractValue', value)}
                >
                  <SelectTrigger className='text-base sm:text-sm'>
                    <SelectValue placeholder='Choose an option...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='less-500'>less than $500</SelectItem>
                    <SelectItem value='500-2000'>$500 - $2,000</SelectItem>
                    <SelectItem value='2000-5000'>$2,000 - $5,000</SelectItem>
                    <SelectItem value='5000-10000'>$5,000 - $10,000</SelectItem>
                    <SelectItem value='10000-20000'>$10,000 - $20,000</SelectItem>
                    <SelectItem value='20000-50000'>$20,000 - $50,000</SelectItem>
                    <SelectItem value='50000+'>$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-4'>
                <Label className='text-sm font-normal'>
                  What is your currently monthly budget for Upwork Connects? <span className='text-red-500'>*</span>
                </Label>
                <div className='space-y-4 mt-2'>
                  <div className='text-center'>
                    <div className='text-md font-medium mb-4 flex flex-col items-center justify-center gap-1'>
                      {(() => {
                        const dollarValue = formData.budgetValue;
                        const proposals = Math.floor(dollarValue / 3);
                        const replies = Math.floor(proposals * 0.3);
                        return (
                          <div className='flex flex-col items-center'>
                            <span className='text-2xl font-bold text-foreground'>
                              ${dollarValue.toLocaleString()}
                            </span>
                            <span className='text-xs text-muted-foreground mt-1'>
                              {proposals} proposals /
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className='underline decoration-dotted cursor-help ml-1'>
                                    {replies} replies*
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Based on Lancer's reply rate of 30%
                                </TooltipContent>
                              </Tooltip>
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                    <div className='relative'>
                      <Slider
                        value={[formData.budgetValue]}
                        onValueChange={(value) => {
                          setBudgetValue(value[0] as number);
                          updateFormData('budgetValue', value[0] as number);
                        }}
                        max={3000}
                        min={300}
                        step={100}
                      />
                    </div>
                    <div className='flex justify-between text-xs text-muted-foreground mt-2'>
                      <span>$300</span>
                      <span>$3,000 or more</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <Label className='text-sm font-normal'>
                  Who handles your Upwork outreach? <span className='text-red-500'>*</span>
                </Label>
                <div className='flex space-x-1 bg-muted p-1 rounded-lg'>
                  <button
                    type='button'
                    onClick={() => updateFormData('outreachType', 'myself')}
                    className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer border ${
                      formData.outreachType === 'myself'
                        ? 'bg-background text-foreground shadow-sm border-foreground/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border-transparent'
                    }`}
                  >
                    I do it myself
                  </button>
                  <button
                    type='button'
                    onClick={() => updateFormData('outreachType', 'someone-else')}
                    className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer border ${
                      formData.outreachType === 'someone-else'
                        ? 'bg-background text-foreground shadow-sm border-foreground/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border-transparent'
                    }`}
                  >
                    Someone else
                  </button>
                </div>
              </div>

              {formData.outreachType === 'myself' ? (
                <div className='space-y-2'>
                  <Label htmlFor='hours-per-week' className='text-sm font-normal'>
                    How many hours per week do you spend on Upwork outreach? <span className='text-red-500'>*</span>
                  </Label>
                  <Select
                    value={formData.hoursPerWeek}
                    onValueChange={(value) => updateFormData('hoursPerWeek', value)}
                  >
                    <SelectTrigger className='text-base sm:text-sm'>
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
              ) : formData.outreachType === 'someone-else' && (
                <div className='space-y-4'>
                  <Label className='text-sm font-normal'>
                    What's your approximate monthly investment in outreach personnel? <span className='text-red-500'>*</span>
                  </Label>
                  <Select
                    value={formData.personnelInvestment}
                    onValueChange={(value) => updateFormData('personnelInvestment', value)}
                  >
                    <SelectTrigger className='text-base sm:text-sm'>
                      <SelectValue placeholder='Choose an option...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='500'>$500</SelectItem>
                      <SelectItem value='500-1000'>$500 - $1,000</SelectItem>
                      <SelectItem value='1000-2000'>$1,000 - $2,000</SelectItem>
                      <SelectItem value='2000+' >$2,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className='pt-6 flex items-center justify-between'>
                <Button
                  variant='ghost'
                  onClick={handleBack}
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!isStepValid(4)}>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderSuccessContent = () => {
    return (
      <Card className='border-1 shadow-sm'>
        <CardContent className='p-4 sm:p-8'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-start'>
            {/* Left side - Success message */}
            <div className='w-full lg:w-1/2 space-y-6 lg:space-y-8'>
              <div className='flex gap-3 mb-4 sm:mb-6'>
                <CircleCheck className='w-8 h-8 sm:w-10 sm:h-10 text-green-600 flex-shrink-0' />
                <div className='flex-1'>
                  <div className='mb-4 sm:mb-6'>
                    <h2 className='text-lg sm:text-xl lg:text-2xl font-medium'>
                      You're a great fit!
                    </h2>
                  </div>

                  <div className='space-y-3'>
                    <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                      Lancer looks like a great match for your needs.
                    </p>
                    <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                      Your request has been accepted. Book a time in the
                      calendar to speak with a Lancer specialist.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hide submission details on mobile */}
              <div className='hidden md:block space-y-6 pt-4 p-4 sm:p-6 lg:p-10 rounded-lg shadow-sm border border-border/20'>
                <div className=''>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0'>
                    <p className='text-xs sm:text-sm uppercase tracking-wider font-medium'>
                      SUBMISSION DETAILS
                    </p>
                    <Badge className='bg-green-200 text-xs text-green-900 self-start sm:self-center'>
                      Approved
                    </Badge>
                  </div>
                  <div className='space-y-2 mt-4'>
                    <div className='flex items-center gap-2'></div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex gap-3'>
                    <UserRound className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                        CONTACT
                      </p>
                      <p className='text-sm sm:text-base'>
                        {formData.email || 'No email provided'}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Building2 className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                        ORGANIZATION
                      </p>
                      <p className='text-sm sm:text-base'>
                        {formData.companyName || 'No company name provided'}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Users className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                        TEAM SIZE
                      </p>
                      <p className='text-sm sm:text-base'>
                        {formatTeamSize(formData.teamSize)}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <UserRound className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                        ROLE
                      </p>
                      <p className='text-sm sm:text-base'>
                        {formatRole(formData.role)}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Building2 className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                        UPWORK USAGE
                      </p>
                      <p className='text-sm sm:text-base'>
                        {formData.usesUpwork === 'yes'
                          ? 'Currently uses Upwork'
                          : 'Does not use Upwork'}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Users className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                        AVG CONTRACT VALUE
                      </p>
                      <p className='text-sm sm:text-base'>
                        {formatContractValue(
                          formData.usesUpwork === 'yes'
                            ? formData.contractValue
                            : formData.avgContractValue
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-1/2 space-y-4 rounded-lg shadow-sm border border-border/20'>
              <div className='flex items-center justify-between mb-4'></div>

              <div className='w-full'>
                <CalendlyEmbed
                  url='https://calendly.com/ivan-mvp/lancer-1-1-demo-call'
                  minimal={true}
                  height={600}
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
          {isLoading ? (
            <>
              <div className='mb-16 mt-10'>
                <h1 className='text-4xl md:text-7xl mb-6 text-center lg:text-left'>
                  Get Started
                </h1>
              </div>

              <div className='flex flex-col lg:flex-row gap-8 items-start'>
                {/* Left side - Testimonial - Desktop Only */}
                <div className='w-full lg:w-2/5 space-y-8 hidden lg:block'>
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
                </div>

                {/* Right side - Loading */}
                <div className='w-full lg:w-3/5 space-y-8'>
                  <div className=''>
                    <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                      / REQUEST
                    </p>
                    <hr className='mt-2' />
                  </div>

                  {renderLoadingContent()}
                </div>
              </div>
            </>
          ) : !isSubmitted ? (
            <>
              <div className='mb-16 mt-10'>
                <h1 className='text-4xl md:text-7xl mb-6 text-center lg:text-left'>
                  Get Started
                </h1>
              </div>

              <div className='flex flex-col lg:flex-row gap-8 items-start'>
                {/* Left side - Testimonial - Desktop Only */}
                <div className='w-full lg:w-2/5 space-y-8 hidden lg:block'>
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

                  {/* Trusted By Section - Desktop Only */}
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

              {/* Testimonial Section - Mobile Only (Below Form) */}
              <div className='space-y-8 mt-16 lg:hidden'>
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
                        "I had to pause the campaign because we couldn't take on
                        any more work"
                      </blockquote>
                      <p className='text-sm text-muted-foreground'>
                        Nikola Arsovski, Top Rated Upworker
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trusted By Section - Mobile Only (Below Form) */}
              <div className='space-y-4 mt-16 lg:hidden'>
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
                        key={`mobile-${i}`}
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
                        key={`mobile-duplicate-${i}`}
                        className='flex items-center justify-center opacity-60 hover:opacity-80 transition-opacity'
                      >
                        {renderLogo(logo)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='text-center mb-4 md:mb-12'>
                <div className='flex items-center justify-center mb-3 md:mb-6'>
                  <Link href='/'>
                    <LogoIcon size={60} />
                  </Link>
                </div>
                <h1 className='text-xl md:text-2xl lg:text-3xl mb-2 md:mb-4'>
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
