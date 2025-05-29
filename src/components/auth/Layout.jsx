import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
    {/* <!-- Left Section --> */}
    <div className="flex items-center justify-center bg-black w-full lg:w-1/2 p-8">
        <div className="max-w-md space-y-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Welcome to e-commerce shopping
            </h1>
        </div>
    </div>
    
    {/* <!-- Right Section --> */}
    <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <Outlet />
    </div>
</div>



  )
}

export default Layout