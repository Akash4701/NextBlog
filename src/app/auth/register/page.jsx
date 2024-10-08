"use client";

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const router=useRouter();
  const ref=useRef();
  
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const onSubmit = async(data) => {
    setPending(true);
    // Here you can handle registration logic, like API calls
  
    console.log('username',data.username);
    if(!data.email||!data.name||!data.password||!data.username){
      setError('Please fill all the fields');
    }
    try{
      setPending(true)
      const res=await fetch('/api/auth/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
      });
      const result = await res.json();
      if(res){
        setPending(false);
        // ref?.current.reset();
        // router.push(`/auth/login`)
       
      }else{
        console.log('something ent wrong with submitting ');
        setError(result.error || 'Something went wrong');
        setPending(false);
      }
    }catch(error){
        setError('Error while registering');
       

      }
    }
    
   
  

  // Watch form input values
  const userinfo = watch();
  // console.log('userinfo',userinfo) // This will give the form's values

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-700">
      <div className="w-full max-w-md mt-8 bg-slate-500 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">Create an Account</h2>

        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: "Name is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: "Username is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter a unique username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter a strong password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={pending}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out ${
                pending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {pending ? 'Submitting...' : 'Register'}
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
