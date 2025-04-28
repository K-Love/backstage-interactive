// src/components/Button.tsx (updated for hover animation)
import React from 'react';
import { colors } from '@/design-tokens';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}) => {
  const variantStyles = {
    primary: `bg-primary text-white hover:bg-primary-dark`,
    secondary: `bg-neutral-bg text-neutral-text hover:bg-gray-200 border border-gray-300`,
    accent: `bg-accent1 text-white hover:bg-orange-600`,
  }[variant];

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  }[size];

  return (
    <button
      className={`rounded-md font-medium transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${variantStyles} ${sizeStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ backgroundColor: variant === 'primary' ? colors.primary : variant === 'accent' ? colors.accent1 : colors.neutralBg }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;