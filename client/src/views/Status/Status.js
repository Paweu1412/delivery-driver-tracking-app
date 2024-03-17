import { useState, useEffect } from "react";
import { Alert } from "@mantine/core";
import { IconLogout } from '@tabler/icons-react';
import { StatusButton } from "../../components/StatusButton";

import Logo from '../../assets/logo.jpg';

const Status = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3001/api/isUserExists`, {
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

  const handleLogout = () => {
    fetch(`http://${window.location.hostname}:3001/api/logoutUser`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/';
      }
    })
    .catch(error => {
      window.location.href = '/';
    });
  }

  // {navigator.geolocation.getCurrentPosition(position => {console.log(position.coords.latitude, position.coords.longitude)})}

  return (
    <div className="Status text-white">
      {userData.name ? (
        <>          
          <div className="flex w-full justify-center mt-5">
            <img src={Logo} alt="Logo" className="size-[180px]" />
          </div>

          <div className="annotation flex m-3 mb-0 mt-6">
            <div className="header bg-blue-500 w-[70%] rounded-[4px] text-center">
              <h1 className="text-xl font-bold m-3">{userData.name}</h1>
            </div>

            <button className="logout bg-red-500 flex w-[30%] ml-3 rounded-[4px] justify-center items-center" onClick={() => handleLogout()}>
              <IconLogout size={30} />
            </button>
          </div>

          <Alert 
            variant="filled" 
            color="blue" 
            className="m-3"
          >
            Wybierz przycisk z informacją, o której chcesz poinformować restaurację. 
            W przypadku wciśnięcia oraz potwierdzenia go, zostanie on wyświetlony załodze.
          </Alert>

          <div className="buttons block m-3 -mt-2">
            <StatusButton label="Zamówienie" color="#2596be" onClick={() => console.log('blue')} />

            <StatusButton label="Rachunek" color="#DC143C" onClick={() => console.log('orange')} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Status;