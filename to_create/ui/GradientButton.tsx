import React from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export function GradientButton({ 
  children, 
  size = 'md', 
  variant = 'primary',
  className = '',
  onClick 
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    secondary: 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-lg
        font-medium
        text-white
        flex
        items-center
        gap-2
        transition-colors
        duration-200
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
} 