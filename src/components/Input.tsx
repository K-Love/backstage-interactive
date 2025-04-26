import React from 'react';
import { colors } from '@/design-tokens';

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  id?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  required = false,
  id = 'input-field',
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium" style={{ color: colors.neutralText }}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ borderColor: colors.primaryLight, color: colors.neutralText }}
      />
    </div>
  );
};

export default Input;