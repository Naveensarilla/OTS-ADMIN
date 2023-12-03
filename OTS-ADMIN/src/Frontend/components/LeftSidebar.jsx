import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./LeftSidebar.css";

const LeftSidebar = () => {
  const [menubar, setMenu] = useState();

  //   function left_menu_Open() {

  //     setMenu(true);

  //   }

  //   function left_menu_close() {

  //     setMenu(false);

  //   }

  return (
    <>
      <div className="menu">
        <div onClick={() => setMenu(!menubar)}>
          <span class="material-symbols-outlined">menu</span>
        </div>
      </div>

      <div className="k">
        <div
          className={
            menubar ? " mobile left-sidebar-div  " : "left-sidebar-div "
          }
        >
          {/* <ul className={menubar ? "leftsidebar-contents mobile" : "mobile"}> */}

          <ul className="leftsidebar-contents ">
            <li>
              <span class="material-symbols-outlined">home</span>

              <Link> Home</Link>
            </li>

            <li>
              <span class="material-symbols-outlined">grid_view</span>

              <Link>Exams</Link>
            </li>

            <li>
              <span class="material-symbols-outlined">layers</span>

              <Link>Subscriptions</Link>
            </li>

            <li>
              <span class="material-symbols-outlined">forum</span>

              <Link>Ask Doubts</Link>
            </li>

            <li>
              <span class="material-symbols-outlined">description</span>

              <Link>Sample Paper</Link>
            </li>
          </ul>

          {/* //   )} */}
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
