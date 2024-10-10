"use client";

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const session=useSession();
  console.log('session',session?.data?.user);
  // if(session){
  //   redirect('/blogs');
  // }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const formRef = useRef();
  
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      setError('Please fill all the fields');
      return;
    }

    try {
      setPending(true);
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
     
      if (res.ok) {
        router.push('/blogs');
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (error) {
      setError('Error while signing in');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-700">
      <div className="w-full max-w-md mt-8 bg-slate-500 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">Sign In</h2>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Enter your password"
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
              {pending ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-700">Don't have an account? </span>
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;