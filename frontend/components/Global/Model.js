"use client"
import { closeModel } from '@/Store/Reducers/studentReducer';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
const Model = ({children}) => {
    const dispatch = useDispatch();
    const {studentModel} = useSelector((state) => state.studentReducer)
  return (
  <>
  { studentModel ?  <div className='flex items-center justify-center fixed backdrop-blur inset-0 w-screen h-screen bg-black/25 z-[99999]'>
      <div className='bg-white p-6 rounded-lg max-w-screen-xl relative w-full '>
      <span onClick={()=>dispatch(closeModel())} className='absolute top-2 right-2'><IoMdClose /></span>
        {children}
      </div>
    </div>: ""}
  </>
 
  )
}

export default Model
