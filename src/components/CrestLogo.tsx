import React from 'react';

interface CrestLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTitle?: boolean;
  textColor?: string;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({ 
  className = '', 
  showTitle = true,
  textColor = 'text-[#0D47A1]' 
}) => {
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 max-w-full ${className}`}>
      {showTitle && (
        <div className="flex flex-col text-left min-w-0 max-w-full">
          <span className={`font-black tracking-tight uppercase leading-tight ${textColor} text-xs xs:text-sm sm:text-base break-words`}>
            JEHOSHUA ACADEMY OF MARIKINA
          </span>
          <span className="text-[9px] xs:text-[10px] sm:text-[11px] tracking-wider font-extrabold text-amber-500 uppercase truncate">
            INTEGRATED | RESPONSIVE | SUSTAINABLE
          </span>
        </div>
      )}
    </div>
  );
};
