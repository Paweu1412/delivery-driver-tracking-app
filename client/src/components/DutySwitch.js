import { useState } from "react"

export const DutySwitch = ({ onDataLoggedChange }) => {
  const [duty, setDuty] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleDutySwitch = () => {
    const newDutyState = !duty;
    fetch(`http://${window.location.hostname}:3001/api/setDuty?duty=${newDutyState}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDuty(newDutyState);
          onDataLoggedChange(newDutyState);
        }
      })
  };

  const handleMouseDown = () => {
    const id = setTimeout(() => {
      handleDutySwitch();
      clearTimeout(id);
    }, 1000);
    setTimeoutId(id);
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutId);
  };

  const handleTouchStart = () => {
    const id = setTimeout(() => {
      handleDutySwitch();
      clearTimeout(id);
    }, 1000);
    setTimeoutId(id);
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutId);
  };

  return (
    <button
      className={`logout flex w-[30%] ml-3 rounded-[4px] justify-center items-center shadow-lg transition-transform duration-200 ease-in-out active:scale-95 ${duty ? 'bg-green-600' : 'bg-red-500'}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-logged={duty}
    >
      {duty ? 'Wyloguj z pracy' : 'Zaloguj do pracy'}
    </button>
  )
}
