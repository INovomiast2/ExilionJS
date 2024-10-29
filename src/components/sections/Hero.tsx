'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GradientButton } from '../ui/GradientButton';
import { useI18n } from '@/hooks/useI18n';
import { FiGithub, FiBook, FiZap, FiCode } from 'react-icons/fi';
import { Tilt } from 'react-tilt';
import { ExilonLogo } from '../ui/ExilonLogo';

const FloatingCard = ({ children, delay = 0 }: { children: ReactNode, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
  >
    <Tilt
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
      options={{
        max: 25,
        scale: 1.05,
        speed: 1000,
      }}
    >
      {children}
    </Tilt>
  </motion.div>
);

export function Hero() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Efecto de partículas en el fondo
  useEffect(() => {
    const gradient = document.createElement('div');
    gradient.className = 'absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 z-0';
    containerRef.current?.appendChild(gradient);

    return () => {
      gradient.remove();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900"
      style={{ y, opacity }}
    >
      {/* Grid de fondo animado */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {t('hero.title')}
              <br />
              <span className="text-blue-400">
                {t('hero.subtitle')}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <GradientButton size="lg" className="gap-2">
              <FiZap className="w-5 h-5" />
              {t('hero.cta.primary')}
            </GradientButton>
            
            <GradientButton size="lg" variant="secondary" className="gap-2">
              <FiBook className="w-5 h-5" />
              {t('hero.cta.docs')}
            </GradientButton>

            <GradientButton size="lg" className="gap-2 bg-white/10 hover:bg-white/20">
              <FiGithub className="w-5 h-5" />
              {t('hero.cta.github')}
            </GradientButton>
          </motion.div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            <FloatingCard delay={0.6}>
              <div className="text-3xl font-bold text-blue-400">100%</div>
              <div className="text-sm text-gray-400">Type Safe</div>
            </FloatingCard>
            <FloatingCard delay={0.7}>
              <div className="text-3xl font-bold text-purple-400">0.5s</div>
              <div className="text-sm text-gray-400">Build Time</div>
            </FloatingCard>
            <FloatingCard delay={0.8}>
              <div className="text-3xl font-bold text-blue-400">5KB</div>
              <div className="text-sm text-gray-400">Runtime</div>
            </FloatingCard>
            <FloatingCard delay={0.9}>
              <div className="text-3xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-gray-400">Scalable</div>
            </FloatingCard>
          </div>
        </div>

        {/* Modelo 3D */}
        <div className="relative h-[600px] w-full items-center flex justify-center">
          <ExilonLogo width={450} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-blue-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </motion.div>
  );
} 