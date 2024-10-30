import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { FiGlobe, FiCheck } from 'react-icons/fi';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' }
];

export function LanguageSelector() {
  const { locale, changeLocale } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors"
      >
        <FiGlobe className="w-4 h-4" />
        <span className="text-sm">{languages.find(l => l.code === locale)?.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 z-50 min-w-[150px] py-2 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLocale(lang.code as 'en' | 'es');
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-white/5"
                >
                  <span>{lang.label}</span>
                  {locale === lang.code && (
                    <FiCheck className="w-4 h-4 text-blue-500" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 