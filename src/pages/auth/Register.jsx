import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '@/components/comman/form';
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  userName: '',
  email: '',
  password: '',

}

function Register() {

  const [formData , setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { toast } = useToast()
 


  const onSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const result = await dispatch(registerUser(formData)).unwrap(); // Unwrap to handle errors
      if (result?.success) {
        toast({
          title: result.message, // Success message from the API
        });
        navigate('/auth/login'); // Redirect to login on success
      } else {
        toast({
          title: result?.message || 'Something went wrong!', // Fallback for missing messages
          variant: 'destructive',
        });
      }
    } catch (error) {
      // Handle rejection or API errors
      toast({
        title: error?.response?.data?.message || 'Registration failed. Please try again.',
        variant: 'destructive',
      });
      console.error('Registration error:', error);
    }
  };
  
  return <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight'>
        Create New Account
      </h1>
      <p className='mt-2'>already have a account 
      <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
      </p>
    </div>
    <Form formControls ={registerFormControls} formData={formData} setFormData={setFormData} buttonText={'Sign Up'} onSubmit={onSubmit}/>


  </div>
}

export default Register