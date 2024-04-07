import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';

const List = () => {
  const [activeUsers, setActiveUsers] = useState(['1']);

  useEffect(() => {
    setInterval(() => {
      fetch(`http://${window.location.hostname}:3001/api/getActiveUsers`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            setActiveUsers(data.activeUsers);
          }
        })
        .catch(error => {
          console.error(`Wystąpił błąd: ${error.message}`);
        });
    }, 2000);
  }, []);

  return (
    <div className="List p-4 flex w-full h-full justify-center">
      {activeUsers.map((id) => (
        <Card key={id} id={id} />
      ))}
    </div>
  )
};

export default List;