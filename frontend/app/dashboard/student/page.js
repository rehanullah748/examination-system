import React from 'react'
import CreateStudents from "./CreateStudents.js"
import { check_auth } from '@/app/actions.js'
import { redirect } from 'next/navigation.js'
const page = () => {
  const auth = check_auth()
  
  return (
    <CreateStudents />
  )
}

export default page