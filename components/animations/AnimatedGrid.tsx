import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from './AnimationVariants';

interface AnimatedGridProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1
}) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={staggerItem}
          key={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
