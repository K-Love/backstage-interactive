// src/components/headers/AboutHeader.tsx
import React from 'react';
import { colors } from '@/design-tokens';

const AboutHeader: React.FC = () => {
  return (
    <div className="mt-8 h-64 flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-label="Tech and creativity crossroads illustration">
        {/* Crossroads */}
        <path d="M150 50 V150" stroke={colors.primary} strokeWidth="5" />
        <path d="M50 100 H250" stroke={colors.primary} strokeWidth="5" />
        {/* Tech side (circuits) */}
        <path d="M50 80 H80 V60 H110" stroke={colors.accent2} strokeWidth="3" />
        <path d="M50 120 H80 V140 H110" stroke={colors.accent2} strokeWidth="3" />
        {/* Creativity side (artistic elements) */}
        <circle cx="220" cy="80" r="10" fill={colors.accent1} />
        <circle cx="240" cy="100" r="10" fill={colors.accent1} />
        <circle cx="220" cy="120" r="10" fill={colors.accent1} />
      </svg>
    </div>
  );
};

export default AboutHeader;