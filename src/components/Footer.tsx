import React from 'react';
import Link from 'next/link';
import { colors } from '@/design-tokens';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-bg text-neutral-text py-8" style={{ backgroundColor: colors.neutralBg, color: colors.neutralText }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Backstage Interactive</h3>
            <p>Building digital experiences that inspire and deliver results.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/studio" className="hover:text-primary">Studio</Link></li>
              <li><Link href="/agency" className="hover:text-primary">Agency</Link></li>
              <li><Link href="/tools" className="hover:text-primary">Tools</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Backstage Interactive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;