import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'


export const SidebarData=[
    {
        title:'Dashboard',
        path:'/Dashboard',
        icon:<AiIcons.AiFillDashboard/>,
        cName:'nav-text'
    },
    {
        title:'Addprices',
        path:'/Addprices',
        icon:<FaIcons.FaHome/>,
        cName:'nav-text'
    },

    {
        title:'Tollgates list',
        path:'/Guests',
        icon:<IoIcons.IoIosPeople/>,
        cName:'nav-text'
    },
    {
        title:'Payments',
        path:'/Bookings',
        icon:<IoIcons.IoIosBed/>,
        cName:'nav-text'
    },
    {
        title:'My Account',
        path:'/MyAccount',
        icon:<AiIcons.AiFillProfile/>,
        cName:'nav-text'
    },
    // {
    //     title:'Log Out',
        
    //     icon:<IoIcons.IoIosLogOut/>,
    //     cName:'nav-text'
    // },
]
