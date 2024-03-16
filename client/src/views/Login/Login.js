import { useState } from 'react';
import { IconUser, IconKey, IconAlertCircle } from '@tabler/icons-react';
import { Input, Button, Alert } from '@mantine/core';

import Logo from '../../assets/logo.jpg';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!identifier || !password) {
      setError('Proszę wypełnić wszystkie pola');
    } else {
      fetch(`http://localhost:3001/api/isUserExists?identifier=${identifier}&password=${password}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setError('');
            window.location.href = '/dashboard';
          } else {
            setError(data.message);
          }
        });
    }
  };

  return (
    <div className="Login flex w-screen h-screen flex-col items-center justify-center">
      <img src={Logo} alt="Logo" className="size-[180px] -mt-10" />

      <div className="form mt-5">
        <h1 className="text-2xl font-bold text-center">Zaloguj się do systemu</h1>

        <div className="credentials mt-6 w-[300px]">
          <div className="login mb-4">
            <Input 
              placeholder="Identyfikator" 
              leftSection={<IconUser size={16} />} 
              value={identifier} 
              onChange={(event) => setIdentifier(event.currentTarget.value)}
            />
          </div>

          <div className="password">
            <Input 
              placeholder="Hasło" 
              type="password" 
              leftSection={<IconKey size={16} />} 
              value={password} 
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>

          <Button 
            color="black" 
            className="mt-4" 
            fullWidth 
            onClick={handleLogin}
          >
            Zaloguj się
          </Button>

          {error && <Alert variant="filled" color="red" className="mt-4" icon={<IconAlertCircle />}>{error}</Alert>}
        </div>
      </div>
    </div>
  );
}

export default Login;
