import React from 'react';
import Link from 'next/link';
import { colors } from '@/design-tokens';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary text-white py-4 shadow-md" style={{ backgroundColor: colors.primary }}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Backstage Interactive
        </Link>
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-accent1 transition-colors">
            About
          </Link>
          <Link href="/studio" className="hover:text-accent1 transition-colors">
            Studio
          </Link>
          <Link href="/agency" className="hover:text-accent1 transition-colors">
            Agency
          </Link>
          <Link href="/tools" className="hover:text-accent1 transition-colors">
            Tools
          </Link>
          <Link href="/contact" className="hover:text-accent1 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;