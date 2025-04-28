// src/components/headers/HomeHeader.tsx
import React from 'react';
import { colors } from '@/design-tokens';

const HomeHeader: React.FC = () => {
  return (
    <div className="mt-8 h-64 flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-label="Digital stage illustration">
        {/* Stage background */}
        <rect x="50" y="50" width="200" height="100" rx="10" fill={colors.primaryLight} />
        {/* Digital screens */}
        <rect x="70" y="70" width="40" height="30" rx="5" fill={colors.accent2} />
        <rect x="120" y="70" width="40" height="30" rx="5" fill={colors.accent2} />
        <rect x="170" y="70" width="40" height="30" rx="5" fill={colors.accent2} />
        {/* Gears and lights */}
        <circle cx="85" cy="130" r="10" fill={colors.accent1} />
        <circle cx="215" cy="130" r="10" fill={colors.accent1} />
        <circle cx="150" cy="40" r="8" fill="yellow" />
      </svg>
    </div>
  );
};

export default HomeHeader;