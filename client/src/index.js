import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import './index.css';
import '@mantine/core/styles.css';

import Login from './views/Login/Login';
import Status from './views/Status/Status';
import List from './views/List/List';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/status" element={<Status />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
