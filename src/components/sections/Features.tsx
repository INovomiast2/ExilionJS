'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiZap, FiBox, FiLayers, FiCpu, FiShield } from 'react-icons/fi';
import { Tilt } from 'react-tilt';
import { useI18n } from '@/hooks/useI18n';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
  >
    <Tilt
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 h-full transform-gpu"
      options={{
        max: 25,
        scale: 1.05,
        speed: 1000,
        glare: true,
        "max-glare": 0.5,
      }}
    >
      <div className="relative z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative flex flex-col items-start">
          <div className="p-3 rounded-lg bg-blue-500/10 mb-6">
            <Icon className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

export function Features() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const features = [
    {
      icon: FiCode,
      title: t('features.list.routing.title'),
      description: t('features.list.routing.description'),
    },
    {
      icon: FiZap,
      title: t('features.list.performance.title'),
      description: t('features.list.performance.description'),
    },
    {
      icon: FiBox,
      title: t('features.list.components.title'),
      description: t('features.list.components.description'),
    },
    {
      icon: FiLayers,
      title: t('features.list.themes.title'),
      description: t('features.list.themes.description'),
    },
    {
      icon: FiCpu,
      title: t('features.list.typescript.title'),
      description: t('features.list.typescript.description'),
    },
    {
      icon: FiShield,
      title: t('features.list.security.title'),
      description: t('features.list.security.description'),
    },
  ];

  return (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      {/* Fondo con efecto de partículas */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 opacity-50" />

      <motion.div
        className="container mx-auto px-4"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
} 