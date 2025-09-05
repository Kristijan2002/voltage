import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, bounceIn, scaleIn } from './AnimationVariants';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'bounceIn' | 'scaleIn';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'fadeInUp',
  as: Component = 'div'
}) => {
  const { ref, isInView } = useScrollAnimation();

  const animationVariant = variant === 'fadeInLeft' ? fadeInLeft : 
                          variant === 'fadeInRight' ? fadeInRight :
                          variant === 'bounceIn' ? bounceIn :
                          variant === 'scaleIn' ? scaleIn : fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariant}
      transition={{ delay }}
      className={className}
    >
      <Component>{children}</Component>
    </motion.div>
  );
};
