import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { ExilonLogo } from './ExilonLogo';
import { GradientButton } from './GradientButton';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { FiGithub, FiBook, FiMenu } from 'react-icons/fi';

export function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <ExilonLogo />
            <span className="font-bold text-xl">Exilon</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/docs">{t('nav.docs')}</NavLink>
            <NavLink href="/examples">{t('nav.examples')}</NavLink>
            <NavLink href="/blog">{t('nav.blog')}</NavLink>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              
              <GradientButton size="sm" variant="secondary">
                <FiGithub className="w-4 h-4" />
                <span>GitHub</span>
              </GradientButton>
              <GradientButton size="sm">
                <FiBook className="w-4 h-4" />
                <span>{t('nav.getStarted')}</span>
              </GradientButton>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-black/20 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <NavLink href="/docs">{t('nav.docs')}</NavLink>
          <NavLink href="/examples">{t('nav.examples')}</NavLink>
          <NavLink href="/blog">{t('nav.blog')}</NavLink>
          <div className="flex flex-col space-y-2">
            <GradientButton size="sm" variant="secondary">
              <FiGithub className="w-4 h-4" />
              <span>GitHub</span>
            </GradientButton>
            <GradientButton size="sm">
              <FiBook className="w-4 h-4" />
              <span>{t('nav.getStarted')}</span>
            </GradientButton>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="text-gray-300 hover:text-white transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
} 