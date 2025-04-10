import React, { useState } from 'react';
import { REFRESH_TOKEN, TOKEN_AUTHOR, USER_LOGIN } from '../Utils/Interceptor';
import { getDataJSONStorage, removeDataTextStorage } from '../Utils/UltilFunction';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useMessage } from '../Context/MessageContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Topbar = ({ setSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = getDataJSONStorage(USER_LOGIN);
  const { showMessage } = useMessage();
  const navigate = useNavigate()
  

  const handleLogout = () => {
    removeDataTextStorage(TOKEN_AUTHOR);
    removeDataTextStorage(REFRESH_TOKEN);
    removeDataTextStorage(USER_LOGIN);
    navigate("/");
    showMessage("Logout success!", "success");
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white shadow relative">
      {/* Hamburger */}
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right content */}
      <div className="flex items-center gap-4">
        <NotificationsIcon className="text-gray-600" />

        <div className="relative">
          <img
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-10 w-10 rounded-full border border-gray-300 cursor-pointer"
            src={user?.SrcAvatar || '/user.jpg'}
            alt="User avatar"
          />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.Fullname || 'Người dùng'}</p>
                <p className="text-sm text-gray-500">{user?.Email || 'example@email.com'}</p>
              </div>
              <ul className="py-2">
                <li>
                  <NavLink to="/user/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <AccountCircleIcon fontSize="small" />
                    Profile
                  </NavLink>
                </li>
                {/* <li>
                  <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <SettingsIcon fontSize="small" />
                    Cài đặt
                  </a>
                </li> */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogoutIcon fontSize="small" />
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
