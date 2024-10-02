import React, { ReactNode } from "react";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className = '', 
  text, 
  ...props 
}: GradientButtonProps) => (
  <button 
    className={`btn-gradient-border ${className}`.trim()} 
    {...props}
  >
    {text}{children}
  </button>
);
