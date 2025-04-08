import React from 'react'
import MyNavbar from '../Component/MyNavbar/MyNavbar'
import MyFooter from '../Component/MyFooter/MyFooter'
import { Outlet } from 'react-router-dom'

const TempUIUser = () => {
  return (
    <>
      <MyNavbar></MyNavbar>
      <Outlet></Outlet>
      <MyFooter></MyFooter>
    </>
  )
}

export default TempUIUser