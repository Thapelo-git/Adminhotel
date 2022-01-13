import React, { useState } from 'react'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { IconContext } from 'react-icons'
import Dashboard from './Dashboard'
// import './Stylling.css'

const Header = () =>{
    const [sidebar,setSidebar]=useState(false)
    const showSidebar =()=>setSidebar(!sidebar);
    return (
        <>
       <IconContext.Provider value={{color:'#fff'}}>
           <div className="navbar">
            <Link to='/' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
           </div>
           <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <Link to='/' className='menu-bars'>
                        <AiIcons.AiOutlineClose/>
                    </Link>
                </li>
                {SidebarData.map((item,index)=>{
           return(
    <li key={index} className={item.cName}>
        <Link exact to={item.path}>
            
            {item.icon}
            <span>{item.title}</span>
        </Link>
    </li>
)
                })}
            </ul>
            {/* <Link to='/' className='logout'>
                        <AiIcons.AiOutlineClose/>
                    </Link> */}
           </nav>
          
           </IconContext.Provider>           
        </>
        
    )
}

export default Header


// return(
//     <li key={index} className={item.cName}>
//         <Link exact to={item.path}>
            
//             {item.icon}
//             <span>{item.title}</span>
//         </Link>
//     </li>
// )