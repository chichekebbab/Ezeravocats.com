import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  icon?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  eyebrow,
  backgroundImage,
  backgroundPosition,
  icon,
}: PageHeaderProps) {
  return (
    <div className="relative h-[52vh] min-h-[320px] overflow-hidden bg-gray-900">
      {/* Background */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            backgroundImage: `url("${backgroundImage}")`,
            backgroundPosition: backgroundPosition || 'center',
            backgroundSize: 'cover',
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          {icon}
        </div>
      )}

      {/* Directional overlay: dense on the left, lifting on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/65 to-gray-900/30" />

      {/* Bottom bleed */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/8 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
        <div className="text-white max-w-3xl">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.25em] text-white/55 mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg font-light tracking-wide text-white/70 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
