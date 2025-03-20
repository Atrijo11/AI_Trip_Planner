import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';  // Correct path

const Layout = () => {
  return (
    <div>
      <Header />  {/* ✅ Always show Header */}
      <main>
        <Outlet /> {/* ✅ This renders the page content */}
      </main>
    </div>
  );
};

export default Layout;
