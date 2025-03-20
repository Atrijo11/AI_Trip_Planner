/*import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between item-center px-5'>
      <img src='/logo.svg'/>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header;*/

import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" className="w-36 cursor-pointer" />
      </Link>

      <div>
        {user ? (
          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Sign Out
          </Button>
        ) : (
          <Link to="/sign-in">
            {/* 🔥 Updated Sign In Button */}
            <Button className="bg-black text-white hover:bg-gray-800 transition">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
