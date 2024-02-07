"use client"
import { errorsConversion } from '@/Utils';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const CreateStudents = () => {
  const { push } = useRouter()
  const [state, setState ] = useState({
    reg_no:"",
    name:"",
    f_name:"",
    address:"",
    previous_school:"",
    dob:"",
    image:"",
    clas:"",
    domicile:"",
    session: ""
  })
  const [errors, setErrors] = useState({})
  const [imageLoader, setImageLoader] = useState(false)
  const { error, isError, isSuccess, isLoading, mutate, data} = useMutation(data => {
    return axios.post('http://localhost:5001/api/student/create-student', data)
  
  })
  
  const Submit = () => {
    mutate({...state})
    
  }
  useEffect(() => {
    if(isError) {
      if(error?.response?.status === 400 ) {
          const response = errorsConversion(error?.response?.data?.errors);
          setErrors(response);
            }
  }
    if(isSuccess) {
      toast.success("student created successfully")
      push('/dashboard/students')
    }
  },[isError,isSuccess])
  
 const onChange = (e) => {
  e.preventDefault()
 setState({...state, [e.target.name]: e.target.value })
 }
 const fileTypes = ["JPG", "PNG", "JPEG"];
 const handleChange = async (img) => {
  const file = new FormData();
  file.append("file", img);
  file.append("upload_preset", "r4444res");
  file.append("cloud_name", "dgifwzl50");
  setImageLoader(true)
  try {
      const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dgifwzl50/image/upload",
          file
      );
      setImageLoader(false)
      setState({...state, image: data.secure_url});
      console.log(state)
  } 
  catch (error) {
      console.log(error)
  }  

};

  return (
    <div className='bg-white p-[70px] rounded-lg'>
      <h1 className='text-xl mb-5 font-semibold text-gray-600 '>Create Student</h1>
    <div className="grid grid-cols-1 md:grid-cols-2  mt-4 gap-7 ">
      <div>
      <input name='reg_no' value={state.reg_no} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Registration No"/>
   {errors.reg_no && <span className='text-rose-500'>{errors.reg_no}</span>} 
      </div>
    <div>
    <input name='name' value={state.name} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Name"/>
    {errors.name && <span className='text-rose-500'>{errors.name}</span>} 
    </div>
    <div>
    <input name='f_name' value={state.f_name} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter student Father Name"/>
    {errors.f_name && <span className='text-rose-500'>{errors.f_name}</span>} 
    </div>
   <div>
   <input name='address' value={state.address} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter student Address"/>
   {errors.address && <span className='text-rose-500'>{errors.address}</span>} 
   </div>
    <div>
    <input name='previous_school' value={state.previous_school} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Previous School"/>
    {errors.previous_school && <span className='text-rose-500'>{errors.previous_school}</span>} 
    </div>
    <div>
    <input name='dob' value={state.dob} onChange={onChange} type="date" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Previous School"/>
    {errors.dob && <span className='text-rose-500'>{errors.dob}</span>} 
    </div>
    <div>
    <select name='clas' value={state.clas} onChange={onChange} type='text' class="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
  <option selected>Select Student Class</option>
  <option>6th</option>
  <option>7th</option>
  <option>8th</option>
  <option>9th</option>
  <option>10th</option>
</select>
{errors.clas && <span className='text-rose-500'>{errors.clas}</span>} 
    </div>
    <div>
    <input name='domicile' value={state.domicile} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Domicile"/>
    {errors.domicile && <span className='text-rose-500'>{errors.domicile}</span>} 
    </div>
    <FileUploader handleChange={handleChange} name="file"  types={fileTypes} />
    <span><Image src={state?.image} width={130} height={130} /></span>
    </div>
    {isLoading ? <Spinner/> : <button onClick={Submit} className='bg-blue-600 text-md px-5 py-3 mt-8 text-white rounded-md'>Create Student</button>}
    
    </div>
    
  )
}

export default CreateStudents