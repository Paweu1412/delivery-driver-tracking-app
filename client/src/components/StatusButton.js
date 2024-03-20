import React, { useState } from 'react';

export const StatusButton = ({ label, color, handler, className, disabled, ...props }) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseDown = () => {
    const id = setTimeout(() => {
      handler(); 
      clearTimeout(id); 
    }, 1000);
    setTimeoutId(id); 
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutId);
  };

  const handleTouchStart = () => {
    const id = setTimeout(() => {
      handler();
      clearTimeout(id);
    }, 1000);
    setTimeoutId(id);
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutId);
  };

  return (
    <button
      className={`w-full rounded-[4px] mt-2 h-[60px] p-3 shadow-lg transform transition-transform duration-200 ease-in-out ${disabled ? '' : 'active:scale-95'} ${disabled ? 'opacity-60' : ''} ${className}`}
      style={{ backgroundColor: color }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      disabled={disabled}
      {...props}
    >
      <p className="text-xl">{label}</p>
    </button>
  );
};
