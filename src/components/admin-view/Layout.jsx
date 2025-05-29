import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header';

function AdminLayout() {
  const [opensideBar , setOpenSideBar] = useState(false);
  return (
    

    <div className="flex min-h-screen w-full ">
        {/* admin side bar  */}
        
        <SideBar open={opensideBar} setOpen={setOpenSideBar}/>
        <div className="flex flex-1 flex-col ">
            {/* admin header  */}
            <Header  setOpen={setOpenSideBar}/>
            <main className='flex  flex-col  flex-1 bg-muted/40 p-4 md:p-6 '>
                <Outlet/>
            </main>
        </div>
    </div>
    
  )
}

export default AdminLayout