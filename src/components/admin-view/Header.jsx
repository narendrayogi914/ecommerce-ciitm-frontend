import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'
import {  useToast } from '@/hooks/use-toast'

function Header({setOpen}) {
  const dispatch = useDispatch()
  const {toast} = useToast();

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button className="lg:hidden sm:block" onClick={()=>setOpen(true)}>


      <AlignJustify/>
      <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button className="bg-slate-50 inline-flex gap-2 rounded-md px-4 py-2 text-sm font-medium shadow" onClick={()=>{
          dispatch(logoutUser()).then((data)=>{
            if(data?.payload?.success){
              toast({
                title: `${data?.payload?.message}`,
              })
            }
          })

          
        }}>
          <LogOut/>
          Logout
        </Button>
      </div>

    </header>
  )
}

export default Header