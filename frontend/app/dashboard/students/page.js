import React from 'react'
import AllStudents from './AllStudents'
import { check_auth } from '@/app/actions'


const page = async() => {
  const auth = await check_auth()
 
  return (
    <div>
      <AllStudents auth={auth}/>
    </div>
  )
}

export default page
