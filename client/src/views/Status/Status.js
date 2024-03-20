import React, { useState, useEffect, useRef } from "react";
import { Alert, Notification } from "@mantine/core";
import { IconLogout } from '@tabler/icons-react';
import { StatusButton } from "../../components/StatusButton";
import { DutySwitch } from "../../components/DutySwitch";
import Logo from '../../assets/logo.jpg';

const Status = () => {
  const [userData, setUserData] = useState({});
  const [notification, setNotification] = useState(null);
  const [dutySwitchLogged, setDutySwitchLogged] = useState(false);
  const notificationTimeoutRef = useRef(null);

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
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    setNotification({ message, color });

    const timeoutRef = setTimeout(() => {
      setNotification(null);
    }, 5000);

    notificationTimeoutRef.current = timeoutRef;
  };

  return (
    <div className="Status text-white w-screen items-center flex flex-col">
      {userData.name ? (
        <div className="w-screen max-w-[450px] h-svh relative">
          <div className="flex w-full justify-center">
            <img src={Logo} alt="Logo" className="mt-5 size-[180px]" />
          </div>

          <div className="annotation flex m-3 mb-0 mt-4">
            <div className="header bg-blue-500 w-[70%] rounded-[4px] text-center">
              <h1 className="text-xl font-bold m-3">{userData.name}</h1>
            </div>

            <button className="logout bg-red-500 flex w-[30%] ml-3 rounded-[4px] justify-center items-center shadow-lg transition-transform duration-200 ease-in-out active:scale-95" onClick={() => handleLogout()}>
              <IconLogout size={30} />
            </button>
          </div>

          <div className="flex m-3">
            <Alert 
              variant="filled" 
              color="blue" 
              className="w-[70%]"
            >
              Wybierz przycisk z informacją, o której chcesz poinformować załogę. 💪
            </Alert>

            <DutySwitch onDataLoggedChange={setDutySwitchLogged} />
          </div>

          <div className="buttons block m-3 -mt-2">
            <StatusButton label="W dostawie" color="#B22222" disabled={!dutySwitchLogged} handler={() => {
              showNotification("Status został zaaktualizowany. 😊", "#B22222");
            }} />

            <StatusButton label="Powrót do restauracji" color="#008000" disabled={!dutySwitchLogged} handler={() => {
              showNotification("Status został zaaktualizowany. 😊", "#008000");
            }} />

            <StatusButton label="Przerwa" color="#4169E1" disabled={!dutySwitchLogged} handler={() => {
              showNotification("Status został zaaktualizowany. 😊", "#4169E1");
            }} />
          </div>

          {notification && (
            <div className="absolute bottom-0 w-full">
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
