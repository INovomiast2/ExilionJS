'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiBook, FiSlack, FiHeart, FiArrowRight } from 'react-icons/fi';
import { useI18n } from '@/hooks/useI18n';
import { ExilonLogo } from '../ui/ExilonLogo';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-slate-900 pt-20 pb-10 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-8">
              Get notified about the latest features and updates.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img src="https://ik.imagekit.io/pxjkpi3mt/exilon_logo_svg.svg?updatedAt=1730166566966" alt="exilon-logo" width={35} />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Exilon
              </span>
            </motion.div>
            <p className="text-gray-400">
              The modern web framework for building blazing-fast applications
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-white flex items-center group"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                      <FiArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
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
  { icon: FiGithub, href: 'https://github.com/exilonjs', label: 'GitHub' },
  { icon: FiTwitter, href: 'https://twitter.com/exilonframework', label: 'Twitter' },
  { icon: FiSlack, href: '/discord', label: 'Discord' },
  { icon: FiBook, href: '/blog', label: 'Blog' },
];

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Releases', href: '/releases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Examples', href: '/examples' },
      { label: 'Showcase', href: '/showcase' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]; 