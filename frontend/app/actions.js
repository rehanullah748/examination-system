"use server"
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export const check_auth= async () => {
    const cookieStore = cookies()
    const examUser = cookieStore.get('examUser')
    if(!examUser) {
      return {auth: false, user: null}
    }
    const decoded= jwtDecode(examUser.value)
    console.log(decoded)
    const expires_in = new Date(decoded.exp * 1000) 
    console.log(expires_in)
   if(new Date() > expires_in){
    cookieStore.delete("examUser")
    return {auth: false, user: null}
   }
   else {
   try {
    const {data} = await axios.get(`http://localhost:5001/api/auth/user-profile?email=${decoded.email}`)
    console.log(data)
    
    return {auth: true, user: data}
   } catch (error) {
    console.log(error)
    return {auth: false, user: null}
   }

   }
  }