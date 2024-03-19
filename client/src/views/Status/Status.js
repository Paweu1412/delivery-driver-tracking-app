import { useState, useEffect } from "react";
import { Alert, Notification } from "@mantine/core";
import { IconLogout } from '@tabler/icons-react';
import { StatusButton } from "../../components/StatusButton";

import Logo from '../../assets/logo.jpg';

const Status = () => {
  const [userData, setUserData] = useState({});
  const [notification, setNotification] = useState(null);

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

  const showNotification = (message, color) => {
    setNotification({ message, color });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Hides notification after 5 seconds
  };

  return (
    <div className="Status text-white w-screen items-center flex flex-col">
      {userData.name ? (
        <div className="w-screen max-w-[450px] h-screen relative">
          <div className="flex w-full justify-center">
            <img src={Logo} alt="Logo" className="mt-5 size-[180px]" />
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
            Wybierz przycisk z informacją, o której chcesz poinformować załogę. 💪
          </Alert>

          <div className="buttons block m-3 -mt-2">
            <StatusButton label="W dostawie" color="#B22222" handler={() => {
              showNotification("Status został zaaktualizowany. 😊", "#B22222");
            }} />

            <StatusButton label="Powrót do restauracji" color="#008000" handler={() => {
              showNotification("Status został zaaktualizowany. 😊", "#008000");
            }} />

            <StatusButton label="Przerwa" color="#4169E1" handler={() => {
              showNotification("Status został zaaktualizowany. 😊", "#4169E1");
            }} />
          </div>

          {notification && (
            <div className="absolute bottom-2 w-full">
              <Notification
                title={notification.message}
                color={notification.color}
                withBorder
                onClose={() => setNotification(null)}
                className="m-3 text-xl"
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Status;
