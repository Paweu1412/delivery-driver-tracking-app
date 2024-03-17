import { useState, useEffect } from "react";

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
          <h1>Witaj, {userData.name}!</h1>
          <p>Twój identyfikator: {userData.id}</p>
        </>
      ) : null}
    </div>
  );
}

export default Status;