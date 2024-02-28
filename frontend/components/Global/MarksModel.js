"use client"
import { closeModel } from '@/Store/Reducers/marksReducer';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
const MarksModel = ({children}) => {
    const dispatch = useDispatch();
    const {marksModel} = useSelector((state) => state.marksReducer)
    // /marks/create-marks
  return (
  <>
  { marksModel ?  <div className=' flex items-center justify-center fixed backdrop-blur inset-0 w-screen h-screen bg-black/25 z-[99999]'>
  <span onClick={()=>dispatch(closeModel())} className='absolute top-5 right-8 cursor-pointer'><IoMdClose size={25} /></span>
      <div className='overflow-y-auto max-h-[90vh] bg-white p-6 rounded-lg  relative w-full lg:w-7/12 '>
     
        {children}
      </div>
    </div>: ""}
  </>
 
  )
}

export default MarksModel
