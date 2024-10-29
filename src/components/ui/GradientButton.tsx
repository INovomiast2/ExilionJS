'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function GradientButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: GradientButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const gradientClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${sizeClasses[size]} ${gradientClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
} 