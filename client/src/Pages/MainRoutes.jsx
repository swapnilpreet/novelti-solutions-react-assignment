import React from 'react'
import {Routes,Route} from 'react-router-dom'
import NewCreate from './NewCreate'
import UserList from './UserList'
import Navbar from '../Compoents/Navbar';


const MainRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<NewCreate/>} />
        <Route path="/listuser" element={<UserList />} />
    </Routes>
    </>
  )
}

export default MainRoutes