import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  illustration?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, illustration }: PageHeaderProps) {
  return (
    <section className="relative py-16 px-4 md:px-8 text-center bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      {/* Background Illustration */}
      {illustration && (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center">
          {illustration}
        </div>
      )}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none" />
      {/* Header Content */}
      <div className="relative z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-neutral-800 drop-shadow-sm">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}