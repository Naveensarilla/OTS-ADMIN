import React from 'react'

import { NavLink } from 'react-router-dom'
import FullTest from '../../Pages/FullTest/FullTest'
import SubjectTest from '../../Pages/SubjectTest/SubjectTest'
import ChapterTest from '../../Pages/ChapterTest/ChapterTest'
import PreviousTest from '../../Pages/PreviousTest/PreviousTest'


import './HomeHeader.css'

const HomeHeader = () => {
  return (
    <div>
          <div className='header-div1'>
              <p className='div-heading'>Online Test for JEE Main</p>
          </div>
          <div className='header-div2'>
              <div className='header-links'>

                  <NavLink activeclassname='active' className='content-link' to='/FullTest' element={<FullTest />}>Full Test</NavLink>
                  <NavLink activeclassname='active' className='content-link' to='/SubjectTest' element={<SubjectTest />}>Subject Test</NavLink>
                  <NavLink activeclassname='active' className='content-link' to='/ChapterTest' element={<ChapterTest />} >Chapter Test</NavLink>
                  <NavLink activeclassname='active' className='content-link' to='/PreviousTest' element={<PreviousTest />}>Previous Years </NavLink>
                
                  
              </div>
          </div>
    </div>
  )
}

export default HomeHeader



