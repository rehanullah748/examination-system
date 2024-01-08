"use client"
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
const ProfilePicture = ({auth}) => {
    console.log(auth)
    const [state, setState] = useState("")
    const [loader, setLoader] = useState(false)
    const { push } = useRouter()
 
    const fileTypes = ["JPG", "PNG", "JPEG"];
    const handleChange = async (img) => {
        const file = new FormData();
        file.append("file", img);
        file.append("upload_preset", "r4444res");
        file.append("cloud_name", "dgifwzl50");
        setLoader(true)
        try {
            const { data } = await axios.post(
                
                "https://api.cloudinary.com/v1_1/dgifwzl50/image/upload",
                file
            );
            setLoader(false)
            console.log(data)
          
            setState(data.secure_url);
        } 
        
        catch (error) {
            setLoader(false)
            
            
        }
        console.log(state)
        
    };
    const { error, isError, isSuccess, isLoading, mutate, data} = useMutation(data => {
        return axios.put('http://localhost:5001/api/auth/update-image' , data)
        
        
      })
      console.log(data)
      
   
    const updateImage = () => {
        mutate({imageURL: state, userId: auth.user._id})
    }
    console.log(state)
    useEffect(() => {
        if(isSuccess) {
            toast.success("image has been updated")
            push("/dashboard")
        }
       
    },[isSuccess])
  return (
    <>
    <div className='grid w-full lg:grid-cols-2 gap-5'>
      <div className='flex items-center gap-3'>
      <form>
  <label for="file-input" class="sr-only">Choose file</label>
   {!loader ? <FileUploader handleChange={handleChange} name="file"  types={fileTypes} /> : <Spinner/>}


</form>
{isLoading ? <Spinner/> : <button onClick={updateImage} type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Save Image
</button>}

      </div>
      <div className='flex items-center justify-end'>

      {state ? <img className="inline-block h-[100px] w-[100px] rounded-full ring-2 ring-white dark:ring-gray-800" src={state}/> : auth?.user?.image ? <img className="inline-block h-[100px] w-[100px] rounded-full ring-2 ring-white dark:ring-gray-800" src={auth?.user?.image}/>: <span className="h-[100px] flex justify-center items-center bg-blue-600 text-white 
      text-[30px] uppercase  font-semibold rounded-full w-[100px]">{auth?.user?.name[0]}</span>}  
      
      </div>
      
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 border-t-[3px] mt-4 gap-4'>
        <div className='mt-3 space-y-3'>
        <input type="text" class="py-3 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder"/>
        <input type="text" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder"/>
        </div>
        <div className='mt-3 space-y-3'>
        <input type="text" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder"/>
        <input type="text" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder"/>
        </div>
    </div>
    </>
  )
}

export default ProfilePicture
