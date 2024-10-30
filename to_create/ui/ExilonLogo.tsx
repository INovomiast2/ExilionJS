import React from 'react';
import { motion } from 'framer-motion';

interface ExilonLogoProps {
  width?: number;
  className?: string;
}

export function ExilonLogo({ width = 40, className = '' }: ExilonLogoProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width, height: width }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 blur-lg" />
      </motion.div>
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src="https://ik.imagekit.io/pxjkpi3mt/exilon_logo_svg.svg?updatedAt=1730166566966" 
          alt="Exilon Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
} 