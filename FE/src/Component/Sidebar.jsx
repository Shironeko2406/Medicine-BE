import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <>
    {/* Sidebar for mobile (slide in) */}
    <div
      className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <aside className="w-64 h-full bg-gray-800 text-white flex flex-col">
        <div className="p-5 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
          <span>
            <img
              className="w-8 h-8 inline-block mr-2"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Logo"
            />
            MedicineTacker
          </span>
          <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl">&times;</button>
        </div>
        <nav className="mt-4 space-y-2 px-4">
          <NavLink to="/user" className="block px-3 py-2 rounded-md bg-gray-900">Home</NavLink>
          <NavLink to="/user/profile" className="block px-3 py-2 rounded-md bg-gray-900">Profile</NavLink>
        </nav>
        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="User avatar"
            />
            <div>
              <p className="text-sm font-medium">Tom Cook</p>
              <p className="text-xs text-gray-400">tom@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </div>

    {/* Sidebar for desktop */}
    <aside className="hidden md:flex w-64 bg-gray-800 text-white flex-col border-r border-gray-200">
      <div className="p-5 text-xl font-bold border-b border-gray-700">
        <img
          className="w-8 h-8 inline-block mr-2"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Logo"
        />
        MedicineTacker
      </div>
      <nav className="mt-4 space-y-2 px-4">
        <NavLink to="/user" className="block px-3 py-2 rounded-md bg-gray-900">Home</NavLink>
        <NavLink to="/user/profile" className="block px-3 py-2 rounded-md bg-gray-900">Profile</NavLink>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="User avatar"
          />
          <div>
            <p className="text-sm font-medium">Tom Cook</p>
            <p className="text-xs text-gray-400">tom@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;
