import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

export default function FloatingFeatures() {
  const { t } = useI18n();
  
  const features = [
    { icon: '⚡', key: 'performance' },
    { icon: '🔒', key: 'security' },
    { icon: '📦', key: 'components' },
    { icon: '🎨', key: 'themes' },
    { icon: '📝', key: 'typescript' },
    { icon: '🛣️', key: 'routing' }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">
                {t(`features.list.${feature.key}.title`)}
              </h3>
              <p className="text-gray-400">
                {t(`features.list.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 