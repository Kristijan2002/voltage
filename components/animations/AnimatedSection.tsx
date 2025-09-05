import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from './AnimationVariants';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeInUp' | 'stagger';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'fadeInUp'
}) => {
  const { ref, isInView } = useScrollAnimation();

  const animationVariant = variant === 'stagger' ? staggerContainer : fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
