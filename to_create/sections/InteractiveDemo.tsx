import React from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from '../ui/GradientButton';

export default function InteractiveDemo() {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-8"
      >
        <h2 className="text-3xl font-bold mb-4">Try it yourself</h2>
        <p className="text-gray-400 mb-8">
          Experience the power of Exilon with our interactive demo
        </p>
        <div className="space-y-4">
          <GradientButton>Launch Demo</GradientButton>
        </div>
      </motion.div>
    </div>
  );
} 