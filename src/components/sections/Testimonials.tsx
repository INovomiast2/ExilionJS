'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiStar, FiGithub, FiTwitter } from 'react-icons/fi';
import { useI18n } from '@/hooks/useI18n';
import { Tilt } from 'react-tilt';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  socialLinks: {
    github?: string;
    twitter?: string;
  };
  delay: number;
}

const TestimonialCard = ({ name, role, company, content, avatar, socialLinks, delay }: TestimonialCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
  >
    <Tilt
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 h-full transform-gpu"
      options={{
        max: 15,
        scale: 1.02,
        speed: 1000,
        glare: true,
        "max-glare": 0.5,
      }}
    >
      <div className="relative z-10">
        {/* Efecto de gradiente en el fondo */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-75" />
        
        {/* Contenido */}
        <div className="relative flex flex-col h-full">
          {/* Avatar y detalles */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Insignia de verificación */}
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <FiStar className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-sm text-gray-400">{role}</p>
              <p className="text-sm text-gray-500">{company}</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-6">
            <div className="text-6xl text-blue-500/20 font-serif">"</div>
            <p className="text-gray-300 italic">{content}</p>
            <div className="text-6xl text-blue-500/20 font-serif text-right">"</div>
          </div>

          {/* Social Links */}
          <div className="mt-auto flex gap-3">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

export function Testimonials() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Testimonios hardcodeados mientras arreglamos el sistema de traducciones
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Developer",
      company: "TechCorp",
      content: "Exilon has revolutionized how we build web applications. Our team's productivity has skyrocketed.",
      avatar: `https://avatars.githubusercontent.com/u/1000000?v=4`,
      socialLinks: {
        github: 'https://github.com/user0',
        twitter: 'https://twitter.com/user0',
      },
    },
    {
      name: "Michael Chen",
      role: "Tech Lead",
      company: "StartupX",
      content: "The combination of performance and ease of use is incredible. I can't imagine going back to developing without Exilon.",
      avatar: `https://avatars.githubusercontent.com/u/1000001?v=4`,
      socialLinks: {
        github: 'https://github.com/user1',
        twitter: 'https://twitter.com/user1',
      },
    },
    {
      name: "Emma Davis",
      role: "Full Stack Developer",
      company: "DevAgency",
      content: "The routing system and state management are simply brilliant. Exilon is the future of web development.",
      avatar: `https://avatars.githubusercontent.com/u/1000002?v=4`,
      socialLinks: {
        github: 'https://github.com/user2',
        twitter: 'https://twitter.com/user2',
      },
    }
  ];

  return (
    <section className="relative py-32 bg-slate-900/50 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

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
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}