'use client'
import React from 'react'
import Button from '../ui/Button'
import {signOut} from "next-auth/react"

function Logoutbutton() {
  return (
   <button className='bg-red-800 text-white px-2 mx-2 my-3 rounded-md' onClick={()=>signOut()}>Logout</button>
  )
}

export default Logoutbutton