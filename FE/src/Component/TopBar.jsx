import React from 'react';

const Topbar = ({ setSidebarOpen }) => (
  <header className="flex items-center justify-between px-4 py-4 bg-white shadow">
    {/* Hamburger on mobile */}
    <div className="flex items-center space-x-2">
      <button
        className="md:hidden text-gray-500 focus:outline-none"
        onClick={() => setSidebarOpen(true)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {/* <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 pl-10 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
          </svg>
        </div>
      </div> */}
    </div>
    <div className="flex items-center space-x-4">
      <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
           viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 01-6 0"/>
      </svg>
      <img
        className="h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        alt="User avatar"
      />
    </div>
  </header>
);

export default Topbar;
