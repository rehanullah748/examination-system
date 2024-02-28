import React from 'react'
import UpdateStudent from './UpdateStudent'
import { check_auth } from '@/app/actions'
import { redirect } from 'next/navigation'

const page = () => {
  const auth = check_auth()
 
  return (
    <div>
      <UpdateStudent/>
    </div>
  )
}

export default page
