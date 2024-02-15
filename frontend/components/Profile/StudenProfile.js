import React from 'react'
import CustomImage from '../Global/CustomImage'
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from 'next/image';


const StudentProfile = ({details, auth}) => {
    console.log(auth.auth)
    console.log(details)
  return (
    <div className=''>
      <div className='flex items-center justify-between space-x-4'>
        <div className='w-[100px] h-[100px] rounded-full border border-3 shadow-lg overflow-hidden '>
            <CustomImage url={details.image} fallback={'/fallback.png'}/>
        </div>
        <div className='ml-[120px]'>
        <h1 className='text-xl font-bold '>Elementry and secondery education department</h1>
        </div>
        <div>
            <Image src={auth.user?.image} width={90} height={90}/>
        </div>
       
      </div>
      <div className='flex items-center space-x-2 mt-5'>
        <FaMapMarkerAlt className='text-black' />
        <span className='text-sm font-medium'>{details.address}</span>
        </div>
        
        <div className='border rounded-lg mt-5'>
        <div className=' flex items-center justify-between w-full p-5'>
        <span className='capitalize text-sm font-medium'> Name</span>
        <span className='capitalize text-sm font-medium'>{details.name}</span>
        </div>
        <div className='border-t flex items-center justify-between w-full p-5'>
        <span className='capitalize text-sm font-medium'>Date Of Birth</span>
        <span className='capitalize text-sm font-medium'>{details.dob}</span>
        </div>
        <div className='border-t flex items-center justify-between w-full p-5'>
        <span className='capitalize text-sm font-medium'>Father Name</span>
        <span className='capitalize text-sm font-medium'>{details.f_name}</span>
        </div>
        <div className='border-t flex items-center justify-between w-full p-5'>
        <span className='capatalize text-sm font-medium'>Registration No</span>
        <span className='capatalize text-sm font-medium'>{details.reg_no}</span>
        </div>
        <div className='border-t flex items-center justify-between w-full p-5'>
        <span className='capatalize text-sm font-medium'>Class</span>
        <span className='capatalize text-sm font-medium'>{details.clas}</span>
        </div>
        <div className='border-t flex items-center justify-between w-full p-5'>
        <span className='capatalize text-sm font-medium'>Domicile</span>
        <span className='capatalize text-sm font-medium'>{details.domicile}</span>
        </div>
        </div>
       
    </div>
  )
}

export default StudentProfile