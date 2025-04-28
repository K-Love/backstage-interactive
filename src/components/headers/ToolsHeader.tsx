// src/components/headers/ToolsHeader.tsx
import React from 'react';
import { colors } from '@/design-tokens';

const ToolsHeader: React.FC = () => {
  return (
    <div className="mt-8 h-64 flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-label="Toolbox with digital tools illustration">
        {/* Toolbox */}
        <rect x="80" y="60" width="140" height="80" rx="10" fill={colors.primary} />
        <rect x="80" y="50" width="140" height="10" fill={colors.primaryDark} />
        {/* Digital tools spilling out */}
        <rect x="100" y="30" width="20" height="20" rx="3" fill={colors.accent1} />
        <circle cx="140" cy="40" r="10" fill={colors.accent2} />
        <rect x="160" y="30" width="20" height="20" rx="3" fill={colors.accent1} />
        <path d="M100 140 L120 160 L140 140" stroke={colors.accent2} strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
};

export default ToolsHeader;