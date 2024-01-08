import React from 'react'
import ProfilePicture from './ProfilePicture'
import { check_auth } from '@/app/actions'

const userSetting = async() => {
  const auth = await check_auth()
  return (
    <div className='bg-white p-5 rounded-lg'>
      <ProfilePicture auth={auth}/>
    </div>
  )
}

export default userSetting