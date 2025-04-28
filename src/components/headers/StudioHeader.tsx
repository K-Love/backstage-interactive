// src/components/headers/StudioHeader.tsx
import React from 'react';
import { colors } from '@/design-tokens';

const StudioHeader: React.FC = () => {
  return (
    <div className="mt-8 h-64 flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-label="Futuristic lab illustration">
        {/* Lab table */}
        <rect x="50" y="120" width="200" height="30" fill={colors.primaryLight} />
        {/* Bubbling experiments */}
        <circle cx="80" cy="100" r="10" fill={colors.accent1} />
        <circle cx="100" cy="90" r="8" fill={colors.accent1} opacity="0.7" />
        <circle cx="120" cy="95" r="12" fill={colors.accent1} opacity="0.5" />
        {/* Digital screens */}
        <rect x="180" y="70" width="40" height="30" rx="5" fill={colors.accent2} />
        <rect x="230" y="70" width="40" height="30" rx="5" fill={colors.accent2} />
      </svg>
    </div>
  );
};

export default StudioHeader;