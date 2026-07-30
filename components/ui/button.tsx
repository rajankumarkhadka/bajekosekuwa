'use client';
import Link from 'next/link';
import { cn } from '@/utils/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  onClick,
  href,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    'w-fit bg-[#C4010F] rounded-lg font-bold text-sm md:text-base tracking-wide text-center text-white',
    'hover:-translate-y-1 active:translate-y-0 transition-all duration-300',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}