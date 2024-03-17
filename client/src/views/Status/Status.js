import { useState, useEffect } from "react";
import { Alert } from "@mantine/core";

const Status = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/isUserExists', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUserData(data.userData)
      } else {
        window.location.href = '/';
      }
    })
    .catch(error => {
      window.location.href = '/';
    });
  }, []);

  return (
    <div className="Status">
      {userData ? (
        <>
          <div className="annotation m-3 p-2 rounded-s bg-blue-500 text-white text-center">
            <h1 className="text-2xl font-bold text-center">Cześć, {userData.name} 👋</h1>
          </div>

          <Alert variant="filled" color="blue" className="m-3" title="💡 Jak wysłać status do restauracji?">Wybierz przycisk z informacją, o której chcesz poinformować restaurację. W przypadku wciśnięcia oraz potwierdzenia go, zostanie on wyświetlony załodze.</Alert>
        </>
      ) : null}
    </div>
  );
}

export default Status;