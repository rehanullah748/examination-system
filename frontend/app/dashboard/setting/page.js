import React from 'react'
import ProfilePicture from './ProfilePicture'
import { check_auth } from '@/app/actions'
import { redirect } from 'next/navigation'
export const metadata = {
  title: 'School Profile',
  description: 'School Profile',
}
const userSetting = async() => {
  const auth = await check_auth()
    console.log(auth)
    if(!auth.auth) {
        redirect('/')
    }
  return (
    <div className='bg-white p-5 rounded-lg'>
      <ProfilePicture auth={auth}/>
    </div>
  )
}

export default userSetting