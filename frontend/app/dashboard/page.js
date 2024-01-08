
import { redirect } from 'next/navigation'
import React from 'react'
import { check_auth } from '../actions'

const page = async() => {
    const auth = await check_auth()
    console.log(auth)
    if(!auth.auth) {
        redirect('/')
    }
  return (
    <div>
      
    </div>
  )
}

export default page