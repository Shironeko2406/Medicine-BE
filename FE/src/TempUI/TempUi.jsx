import React, { useState } from 'react'
import Sidebar from '../Component/Sidebar';
import Topbar from '../Component/TopBar';
import { Outlet } from 'react-router-dom';

const TempUi = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Topbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-5">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default TempUi