import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, fadeInScale, bounceIn, fadeInLeft, fadeInRight } from './AnimationVariants';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeInUp' | 'fadeInScale' | 'bounceIn' | 'fadeInLeft' | 'fadeInRight';
  hover?: boolean;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'fadeInUp',
  hover = true,
  onClick
}) => {
  const { ref, isInView } = useScrollAnimation();

  const animationVariant = variant === 'fadeInScale' ? fadeInScale : 
                          variant === 'bounceIn' ? bounceIn :
                          variant === 'fadeInLeft' ? fadeInLeft :
                          variant === 'fadeInRight' ? fadeInRight : fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariant}
      transition={{ delay }}
      whileHover={hover ? { 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      onClick={onClick}
      className={`${className} ${hover ? 'overflow-hidden rounded-lg' : ''}`}
    >
      {children}
    </motion.div>
  );
};
