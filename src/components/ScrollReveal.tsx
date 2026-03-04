import React, { ReactNode } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

type Animation = 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'slide-in-bottom' | 'slide-in-top';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = 'fade-in',
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold,
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLElement>({ threshold });

  return (
    // @ts-ignore — dynamic tag
    <Tag
      ref={ref}
      className={`scroll-reveal ${animation} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
