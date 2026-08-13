'use client';

import { motion } from 'framer-motion';
import { invitation } from '@/data/invitation';

type RotatingOrnamentProps = {
  className?: string;
  size?: number;
  opacity?: number;
};

const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 30,
      ease: 'linear' as const,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
};

export function RotatingOrnament({ className = '', size = 120, opacity = 0.35 }: RotatingOrnamentProps) {
  const frameStyle = {
    width: size,
    height: size,
  };

  const ornamentStyle = {
    width: size,
    height: size,
    maskImage: `url(${invitation.roundOrnament})`,
    WebkitMaskImage: `url(${invitation.roundOrnament})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    opacity,
  };

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`} style={frameStyle}>
      <motion.div className="h-full w-full" variants={spinVariants} animate="animate">
        <div
          className="h-full w-full bg-lavender-soft drop-shadow-[0_0_16px_rgba(200,173,212,0.55)]"
          style={ornamentStyle}
        />
      </motion.div>
    </div>
  );
}
