import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/comman/form';
import { loginFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';

const initialState = {
 
  email: '',
  password: '',

}

function Register() {

  const [formData , setFormData] = useState(initialState);
  const dispatch = useDispatch();
   const { toast } = useToast()

  const  onSubmit= (e)=>{
    e.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
        toast({
          title: `${data?.payload?.message}`,
        })
      }else{
        toast({
          title: `${data?.payload?.message}`,
          variant:'destrictive'
        })
      }
      
    })

    



  }

  return <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight'>
        Login Here
      </h1>
      <p className='mt-2'>don't have a account
      <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/register'>Register here </Link>
      </p>
    </div>
    <Form formControls ={loginFormControls} formData={formData} setFormData={setFormData} buttonText={'Login'} onSubmit={onSubmit}/>


  </div>
}

export default Register