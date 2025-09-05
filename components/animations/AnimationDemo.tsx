import React from 'react';
import { AnimatedSection, AnimatedCard, AnimatedText, AnimatedGrid, AnimatedIcon } from './index';
import { CheckCircle, Zap, Shield, Phone } from 'lucide-react';

export const AnimationDemo: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <AnimatedText as="h2" className="mb-4 text-3xl font-bold" variant="fadeInUp" delay={0.2}>
            Animation Demo
          </AnimatedText>
          <AnimatedText as="p" className="text-xl text-gray-600" variant="fadeInUp" delay={0.4}>
            Scroll down to see different animation effects
          </AnimatedText>
        </AnimatedSection>

        {/* Fade In Up Animation */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="fadeInUp" delay={0.2}>
            Fade In Up Animation
          </AnimatedText>
          <AnimatedCard variant="fadeInUp" delay={0.4} className="p-6 bg-white rounded-lg shadow-md">
            <p>This card fades in from below with a smooth animation.</p>
          </AnimatedCard>
        </AnimatedSection>

        {/* Fade In Left Animation */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="fadeInLeft" delay={0.2}>
            Fade In Left Animation
          </AnimatedText>
          <AnimatedCard variant="fadeInLeft" delay={0.4} className="p-6 bg-white rounded-lg shadow-md">
            <p>This card slides in from the left side.</p>
          </AnimatedCard>
        </AnimatedSection>

        {/* Fade In Right Animation */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="fadeInRight" delay={0.2}>
            Fade In Right Animation
          </AnimatedText>
          <AnimatedCard variant="fadeInRight" delay={0.4} className="p-6 bg-white rounded-lg shadow-md">
            <p>This card slides in from the right side.</p>
          </AnimatedCard>
        </AnimatedSection>

        {/* Bounce In Animation */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="bounceIn" delay={0.2}>
            Bounce In Animation
          </AnimatedText>
          <AnimatedCard variant="bounceIn" delay={0.4} className="p-6 bg-white rounded-lg shadow-md">
            <p>This card bounces in with a spring effect.</p>
          </AnimatedCard>
        </AnimatedSection>

        {/* Scale In Animation */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="scaleIn" delay={0.2}>
            Scale In Animation
          </AnimatedText>
          <AnimatedCard variant="fadeInScale" delay={0.4} className="p-6 bg-white rounded-lg shadow-md">
            <p>This card scales in from a smaller size.</p>
          </AnimatedCard>
        </AnimatedSection>

        {/* Staggered Grid Animation */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="fadeInUp" delay={0.2}>
            Staggered Grid Animation
          </AnimatedText>
          <AnimatedGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[1, 2, 3, 4].map((item) => (
              <AnimatedCard 
                key={item} 
                variant="fadeInUp" 
                delay={item * 0.1}
                className="p-6 bg-white rounded-lg shadow-md text-center"
              >
                <AnimatedIcon 
                  variant="bounceIn" 
                  delay={0.2 + item * 0.1}
                  className="mx-auto mb-4"
                >
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </AnimatedIcon>
                <h4 className="font-semibold mb-2">Item {item}</h4>
                <p className="text-sm text-gray-600">This item animates with a stagger effect.</p>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* Icon Animations */}
        <AnimatedSection className="mb-16">
          <AnimatedText as="h3" className="mb-8 text-2xl" variant="fadeInUp" delay={0.2}>
            Icon Animations
          </AnimatedText>
          <div className="flex justify-center space-x-8">
            <AnimatedIcon variant="bounceIn" delay={0.4} className="bg-yellow-500 rounded-full p-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </AnimatedIcon>
            <AnimatedIcon variant="rotateIn" delay={0.6} className="bg-blue-500 rounded-full p-4">
              <Zap className="h-8 w-8 text-white" />
            </AnimatedIcon>
            <AnimatedIcon variant="scaleIn" delay={0.8} className="bg-green-500 rounded-full p-4">
              <Shield className="h-8 w-8 text-white" />
            </AnimatedIcon>
            <AnimatedIcon variant="bounceIn" delay={1.0} className="bg-purple-500 rounded-full p-4">
              <Phone className="h-8 w-8 text-white" />
            </AnimatedIcon>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};
