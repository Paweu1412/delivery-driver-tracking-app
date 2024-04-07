import { useEffect, useState } from "react";

export const Card = ({ id }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setInterval(() => {
      fetch(`http://${window.location.hostname}:3001/api/getUserData?identifier=${id}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log(data.userData)
            setUserData(data.userData);
          }
        })
        .catch(error => {
          console.error(`Wystąpił błąd: ${error.message}`);
        });
    }, 1000);
  }, []);

  return (
    <div className="Card">
      {id} {userData.name}
    </div>
  )
}