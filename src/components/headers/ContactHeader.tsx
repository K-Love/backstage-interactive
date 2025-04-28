// src/components/headers/ContactHeader.tsx
import React from 'react';
import { colors } from '@/design-tokens';

const ContactHeader: React.FC = () => {
  return (
    <div className="mt-8 h-64 flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-label="Digital mailbox illustration">
        {/* Mailbox */}
        <rect x="100" y="60" width="100" height="60" rx="5" fill={colors.primary} />
        <path d="M100 90 L150 110 L200 90" stroke={colors.primaryDark} strokeWidth="3" fill="none" />
        {/* Incoming messages */}
        <rect x="220" y="80" width="30" height="20" rx="3" fill={colors.accent1} />
        <rect x="240" y="100" width="30" height="20" rx="3" fill={colors.accent1} opacity="0.7" />
        <path d="M210 90 L220 80" stroke={colors.accent2} strokeWidth="2" />
        <path d="M210 110 L230 100" stroke={colors.accent2} strokeWidth="2" />
      </svg>
    </div>
  );
};

export default ContactHeader;