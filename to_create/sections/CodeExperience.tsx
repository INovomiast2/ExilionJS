import React from 'react';
import { motion } from 'framer-motion';
import CodeDemo from './CodeDemo';

export default function CodeExperience() {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Write Better Code</h2>
        <p className="text-xl text-gray-400">
          Experience the future of web development with Exilon
        </p>
      </motion.div>
      <CodeDemo />
    </div>
  );
} 