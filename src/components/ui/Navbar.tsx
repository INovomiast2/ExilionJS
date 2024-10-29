'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { useI18n } from '@/hooks/useI18n';
import { FiSun, FiMoon, FiGlobe } from 'react-icons/fi';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, changeLocale } = useI18n();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <img src="https://ik.imagekit.io/pxjkpi3mt/exilon_logo_svg.svg?updatedAt=1730166566966" alt="exilon-logo" width={35} className='items-center flex' />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              ExilonJS
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#code">Code</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="https://docs.exilon.js.org">Docs</NavLink>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeLocale(locale === 'en' ? 'es' : 'en')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <FiGlobe className="w-5 h-5" />
            </motion.button>

            {/* Theme Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </motion.a>
  );
}
