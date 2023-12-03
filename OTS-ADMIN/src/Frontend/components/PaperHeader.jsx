import React from 'react'
import './PaperHeader.css'
import logo from '../../Images/logo.jpg'



const PaperHeader = () => {
  return (
    <div className='jee-header'>
        <img className='logo' src={logo} alt="logo" />
        <p>JEE MAIN 2024 TEST</p>
    </div>
  )
}

export default PaperHeader