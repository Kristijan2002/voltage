import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { rotateIn, bounceIn, scaleIn } from './AnimationVariants';

interface AnimatedIconProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'rotateIn' | 'bounceIn' | 'scaleIn';
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'bounceIn',
  size = 'md'
}) => {
  const { ref, isInView } = useScrollAnimation();

  const animationVariant = variant === 'rotateIn' ? rotateIn : 
                          variant === 'scaleIn' ? scaleIn : bounceIn;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariant}
      transition={{ delay }}
      className={`${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
