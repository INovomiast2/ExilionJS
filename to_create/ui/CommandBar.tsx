import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCommand, FiX } from 'react-icons/fi';

interface CommandBarProps {
  onClose: () => void;
}

export function CommandBar({ onClose }: CommandBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-x-0 top-24 z-50 mx-auto max-w-2xl"
    >
      <div className="relative mx-4">
        <div className="overflow-hidden rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center px-4 py-3 border-b border-white/10">
            <FiSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search commands..."
              className="w-full bg-transparent px-3 py-1 text-white outline-none placeholder:text-gray-400"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-white/10 rounded">⌘</kbd>
              <kbd className="px-2 py-1 text-xs bg-white/10 rounded">K</kbd>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto p-2">
            {/* Aquí irían los comandos */}
            <div className="p-2 hover:bg-white/5 rounded cursor-pointer">
              Comando de ejemplo
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 