// src/components/headers/AgencyHeader.tsx
import React from 'react';
import { colors } from '@/design-tokens';

const AgencyHeader: React.FC = () => {
  return (
    <div className="mt-8 h-64 flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-label="Blueprint to digital interface illustration">
        {/* Blueprint background */}
        <rect x="50" y="50" width="200" height="100" fill={colors.primaryLight} opacity="0.3" />
        <line x1="50" y1="75" x2="250" y2="75" stroke={colors.accent2} strokeWidth="1" strokeDasharray="5,5" />
        <line x1="50" y1="100" x2="250" y2="100" stroke={colors.accent2} strokeWidth="1" strokeDasharray="5,5" />
        <line x1="50" y1="125" x2="250" y2="125" stroke={colors.accent2} strokeWidth="1" strokeDasharray="5,5" />
        {/* Digital interface emerging */}
        <rect x="100" y="70" width="100" height="60" rx="5" fill={colors.primary} />
        <rect x="110" y="80" width="30" height="10" rx="2" fill={colors.accent1} />
        <rect x="150" y="80" width="40" height="10" rx="2" fill={colors.accent1} />
      </svg>
    </div>
  );
};

export default AgencyHeader;