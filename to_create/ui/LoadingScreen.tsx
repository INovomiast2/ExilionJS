import React from 'react';
import { motion } from 'framer-motion';
import { ExilonLogo } from './ExilonLogo';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <ExilonLogo width={80} />
        </motion.div>
        
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Loading Text */}
      <motion.p
        className="absolute bottom-10 text-gray-400 text-sm"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading Exilon...
      </motion.p>
    </div>
  );
} 