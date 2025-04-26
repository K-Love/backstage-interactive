import React from 'react';
import { colors } from '@/design-tokens';

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.neutralBg }}>
      {icon && <div className="text-primary mb-4" style={{ color: colors.primary }}>{icon}</div>}
      <h3 className="text-xl font-bold mb-2" style={{ color: colors.neutralText }}>{title}</h3>
      <p className="text-base" style={{ color: colors.neutralText }}>{description}</p>
    </div>
  );
};

export default Card;