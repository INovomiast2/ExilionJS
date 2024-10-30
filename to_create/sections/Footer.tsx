import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiBook, FiHeart } from 'react-icons/fi';
import { useI18n } from '@/hooks/useI18n';
import { ExilonLogo } from '../ui/ExilonLogo';
import { GradientButton } from '../ui/GradientButton';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-[#030014] pt-20 pb-10">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 relative">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gradient">
              Stay Updated
            </h3>
            <p className="text-gray-400">
              Get notified about the latest features and updates.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
              />
              <GradientButton>Subscribe</GradientButton>
            </form>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <ExilonLogo width={40} />
            <p className="text-gray-400">
              The modern web framework for building blazing-fast applications
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-white block"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center">
              Made with <FiHeart className="mx-1 text-red-500" /> by the Exilon team
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Exilon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/exilonjs' },
  { icon: FiTwitter, href: 'https://twitter.com/exilonjs' },
  { icon: FiBook, href: '/docs' },
];

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Examples', href: '/examples' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Community', href: '/community' },
      { label: 'GitHub', href: 'https://github.com/exilonjs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
]; 