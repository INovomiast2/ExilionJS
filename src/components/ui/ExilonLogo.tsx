'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExilonLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ExilonLogo({ className = "", width = 200, height = 50 }: ExilonLogoProps) {
  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        animate={{
          rotateY: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)',
        }}
        className="relative"
      >
        {/* Logo principal */}
        <motion.img
          src="https://ik.imagekit.io/pxjkpi3mt/exilon_logo_svg.svg?updatedAt=1730166566966"
          alt="Exilon Logo"
          width={width}
          height={height}
          className={`${className} relative z-10`}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.3))',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />

        {/* Sombras y efectos de extrusión */}
        {[...Array(5)].map((_, i) => (
          <motion.img
            key={i}
            src="https://ik.imagekit.io/pxjkpi3mt/exilon_logo_svg.svg?updatedAt=1730166566966"
            alt=""
            width={width}
            height={height}
            className="absolute top-0 left-0 opacity-10"
            style={{
              transform: `translateZ(${-(i + 1) * 2}px)`,
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Efecto de brillo */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shine"
        />
      </motion.div>

      <style>
        {`
          @keyframes shine {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
          .animate-shine {
            animation: shine 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
} 