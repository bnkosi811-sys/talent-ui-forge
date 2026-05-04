import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  glow?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  glow = true,
  ...props 
}) => {
  const baseStyles = "relative transition-all duration-300 active:scale-95 overflow-hidden group";
  
  const variants = {
    primary: "bg-[#00F5FF] text-black hover:bg-[#00D8FF] font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]",
    secondary: "bg-[#FF00E5] text-white hover:bg-[#D400BF] font-bold shadow-[0_0_15px_rgba(255,0,229,0.4)]",
    outline: "border-2 border-[#00F5FF] text-[#00F5FF] bg-transparent hover:bg-[#00F5FF]/10",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/10"
  };

  return (
    <Button 
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {glow && (
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-xl pointer-events-none",
          variant === 'primary' ? "bg-[#00F5FF]" : "bg-[#FF00E5]"
        )} />
      )}
    </Button>
  );
};