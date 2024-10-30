import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiBook, FiArrowRight } from 'react-icons/fi';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10">
              <span className="text-sm">Welcome to ExilonJS ⚡️</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Build Modern Web Apps with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              ExilonJS
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-12"
          >
            Start building your next project with TypeScript, React, and modern web features.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://exilonjs.dev/docs"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <FiBook className="w-5 h-5" />
              <span>Read the Docs</span>
              <FiArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/exilonjs/exilon"
              className="px-8 py-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-20 p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
            <p className="text-gray-400"># Create a new project</p>
            <p className="text-white">npx create-exilon-app my-app</p>
            <p className="text-gray-400 mt-4"># Start development server</p>
            <p className="text-white">cd my-app</p>
            <p className="text-white">npm run dev</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 