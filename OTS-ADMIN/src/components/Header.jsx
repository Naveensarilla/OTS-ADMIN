import React from 'react'
import logo2 from './logo2.jpeg'

const Header = () => {
  return (
  <header>
    <div className='header'>
    <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <img src={logo2} alt="Egrad logo" className='img'  class="h-8" />
    </div>
    </nav>
    </div>
  </header>
  )
}

export default Header