import React, { useState } from 'react';

export const StatusButton = ({ label, color, handler, ...props }) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseDown = () => {
    const id = setTimeout(() => {
      handler(); // Obsługa zdarzenia po sekundzie przytrzymania
      clearTimeout(id); // Wyczyść timer
    }, 1000);
    setTimeoutId(id); // Ustaw id timera w stanie komponentu
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutId); // Wyczyść timer, jeśli przycisk zostanie zwolniony przed upływem sekundy
  };

  return (
    <button
      className="w-full rounded-[4px] mt-2 h-[60px] p-3"
      style={{ backgroundColor: color }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      <p className="text-xl">{label}</p>
    </button>
  );
};
