import React, { useState } from 'react'

import { Link } from 'react-router-dom';
const Leftnav = () => {

  // const[showMenu, setshowMenu] = useState(0);
  return (

<div >
<aside id="sidebar-multi-level-sidebar" class="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
       <ul class="space-y-2 font-medium">
        <li><Link to="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <span class="ms-3"> Dashboard</span></Link></li>
      <li><Link to="/exams"  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"><span class="ms-3">Exam Creation </span></Link></li>
      <li><Link to="/Coursecreation" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"><span class="ms-3">Course Creation</span></Link></li>
      <li><Link to="/InstructionPage"  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"><span class="ms-3">Instruction</span></Link></li>
      <li><Link to="/Testcreation" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"><span class="ms-3">Test Creation</span></Link></li>     
      <li><Link to="/DocumentUpload" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"><span class="ms-3">Document Upload</span></Link></li>  
      </ul></div></aside>
    </div>
  )
}

export default Leftnav