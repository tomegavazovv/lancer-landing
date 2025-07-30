"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Check, ShoppingCart, ChevronRight, ExternalLink, Crown, Heart, Shield, CreditCard, Stars } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function SinglePricingCard({
  badge,
  title,
  subtitle,
  price,
  benefits,
  features,
  featuresIcon,
  featuresTitle = "Included Features",
  featuresBadge,
  primaryButton,
  secondaryButton,
  testimonials,
  testimonialRotationSpeed = 5000,
  animationEnabled = true,
  className,
  cardClassName,
  maxWidth = "max-w-2xl",
}) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, testimonialRotationSpeed)
    return () => clearInterval(interval)
  }, [testimonials?.length, testimonialRotationSpeed])

  return (
    <div ref={sectionRef} className={`py-12 relative overflow-hidden ${className || ""}`}>
      <div className={`container px-4 md:px-6 relative z-10 mx-auto ${maxWidth}`}>
        {animationEnabled ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SinglePricingCardContent
              badge={badge}
              title={title}
              subtitle={subtitle}
              price={price}
              benefits={benefits}
              features={features}
              featuresIcon={featuresIcon}
              featuresTitle={featuresTitle}
              featuresBadge={featuresBadge}
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
              testimonials={testimonials}
              currentTestimonialIndex={currentTestimonialIndex}
              isInView={isInView}
              animationEnabled={animationEnabled}
              cardClassName={cardClassName}
            />
          </motion.div>
        ) : (
          <SinglePricingCardContent
            badge={badge}
            title={title}
            subtitle={subtitle}
            price={price}
            benefits={benefits}
            features={features}
            featuresIcon={featuresIcon}
            featuresTitle={featuresTitle}
            featuresBadge={featuresBadge}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
            testimonials={testimonials}
            currentTestimonialIndex={currentTestimonialIndex}
            isInView={isInView}
            animationEnabled={animationEnabled}
            cardClassName={cardClassName}
          />
        )}
      </div>
    </div>
  )
}

function SinglePricingCardContent({
  badge,
  title,
  subtitle,
  price,
  benefits,
  features,
  featuresIcon,
  featuresTitle,
  featuresBadge,
  primaryButton,
  secondaryButton,
  testimonials,
  currentTestimonialIndex,
  isInView,
  animationEnabled,
  cardClassName,
}) {
  const BadgeIcon = badge?.icon
  const FeaturesBadgeIcon = featuresBadge?.icon
  const FeaturesIcon = featuresIcon
  const PrimaryButtonIcon = primaryButton.icon
  const ChevronIcon = primaryButton.chevronIcon
  const SecondaryButtonIcon = secondaryButton?.icon

  return (
    <Card className={`overflow-hidden border border-primary/10 relative group ${cardClassName || ""}`}>
      {animationEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-primary/5 via-primary/2 to-transparent" />
        </motion.div>
      )}
      <div className="flex flex-col md:flex-row">
        {/* Left column - Pricing details */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
          {badge && (
            <div className="flex items-center mb-4">
              <Badge className="px-3 py-1 bg-primary/5 border-primary/10 text-primary hover:bg-primary/10">
                {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 mr-1" />}
                <span>{badge.text}</span>
              </Badge>
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{subtitle}</p>
          <div className="mb-6">
            <div className="mb-2">
              <span className="text-4xl font-bold">{price.current}</span>
            </div>
            <div className="flex items-center gap-2">
              {price.discount && (
                <Badge
                  variant="outline"
                  className={`border-green-400/30 text-green-500 ${price.discountBadgeClassName || ""}`}
                >
                  <span>{price.discount}</span>
                </Badge>
              )}
              {price.original && <span className="text-muted-foreground line-through">{price.original}/month</span>}
            </div>
          </div>
          <div className="space-y-4 mb-6">
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon
              return (
                <div key={index} className="flex items-center gap-2">
                  <BenefitIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-auto space-y-3">
            <Button asChild className="w-full gap-2 group" size="lg">
              <Link href="https://1.lancer.app">
                <PrimaryButtonIcon className="h-4 w-4" />
                <span>{primaryButton.text}</span>
                {ChevronIcon && (
                  <ChevronIcon className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </Button>
            {secondaryButton && (
              secondaryButton.onClick ? (
                <Button 
                  variant="outline" 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={secondaryButton.onClick}
                >
                  <span>{secondaryButton.text}</span>
                  <SecondaryButtonIcon className="h-4 w-4 ml-auto" />
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full gap-2" size="lg">
                  <Link href="/get-started">
                    <span>{secondaryButton.text}</span>
                    <SecondaryButtonIcon className="h-4 w-4 ml-auto" />
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
        {/* Right column - Features */}
        <div className="p-6 md:p-8 md:w-1/2 md:border-l border-border/50">
          <div className="flex items-center mb-4">
            <h4 className="font-semibold">{featuresTitle}</h4>
          </div>
          <div className="space-y-3 mb-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={animationEnabled ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                animate={animationEnabled && isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <FeaturesIcon className="h-3 w-3 text-primary" />
                <span className="text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          {testimonials.length > 0 && (
            <>
              <Separator className="my-6" />
              <div className="rounded-lg p-4 border border-border/50 relative overflow-hidden min-h-[140px]">
                <AnimatePresence mode="wait">
                  {testimonials.map(
                    (testimonial, index) =>
                      index === currentTestimonialIndex && (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 p-4"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img
                                src={testimonial.avatar || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
                                alt={`${testimonial.name}'s avatar`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {testimonial.role}
                                {testimonial.company && ` at ${testimonial.company}`}
                              </p>
                            </div>
                            <div className="ml-auto flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm italic">{testimonial.content}</p>
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </div>
              {testimonials.length > 1 && (
                <div className="flex justify-center mt-4 gap-1">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentTestimonialIndex ? "w-4 bg-primary" : "w-1.5 bg-primary/30"
                      }`}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  )
} 