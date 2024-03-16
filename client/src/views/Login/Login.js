import { IconUser, IconKey } from '@tabler/icons-react';
import { Input, Button } from '@mantine/core';

import Logo from '../../assets/logo.jpg';

const Login = () => {
  return (
    <div className="Login flex w-screen h-screen flex-col items-center justify-center">
      <img src={Logo} alt="Logo" className="size-[180px] -mt-10" />

      <div className="form mt-5">
        <h1 className="text-2xl font-bold">Zaloguj się do systemu</h1>

        <div className="credentials mt-6">
          <div className="login mb-4">
            <Input placeholder="Identyfikator" leftSection={<IconUser size={16} />} />
          </div>

          <div className="password">
            <Input placeholder="Hasło" type="password" leftSection={<IconKey size={16} />} />
          </div>

          <Button color="black" className="mt-6" fullWidth>Zaloguj się</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;