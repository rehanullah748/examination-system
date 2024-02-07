

"use client"

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';


const UpdateStudent = () => {
  const router = useSearchParams()
  const { push } = useRouter()
  const id = router.get("id")
  console.log(id)
  const [updateStudent, setUpdateStudent ] = useState({
    reg_no:"",
    name:"",
    f_name:"",
    address:"",
    previous_school:"",
    dob:"",
    image:"",
    clas:"",
    domicile:""
  })
const currentDate = new Date()

  useEffect(() => {
    const fectchStudent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/student/student-details/${id}`)
        console.log(data)
        setUpdateStudent(data)
      } catch (error) {
      }
    }
    fectchStudent();
  }, [id])
  const Update = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/student/update-student/${id}`, updateStudent)
      toast.success("student updated successfully")
      push("/dashboard/students")
    } catch (error) {
      console.log(error)
    }
  }

  
  
 const onChange = (e) => {
  e.preventDefault()
 setUpdateStudent({...updateStudent, [e.target.name]: e.target.value })
 }
 const fileTypes = ["JPG", "PNG", "JPEG"];
 const handleChange = async (img) => {
  const file = new FormData();
  file.append("file", img);
  file.append("upload_preset", "r4444res");
  file.append("cloud_name", "dgifwzl50");

  try {
      const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dgifwzl50/image/upload",
          file
      );

      setUpdateStudent({...updateStudent, image: data.secure_url});
    
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
      <input name='reg_no' value={updateStudent.reg_no} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Registration No"/>
  
      </div>
    <div>
    <input name='name' value={updateStudent.name} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Name"/>
    
    </div>
    <div>
    <input name='f_name' value={updateStudent.f_name} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter student Father Name"/>
  
    </div>
   <div>
   <input name='address' value={updateStudent.address} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter student Address"/>

   </div>
    <div>
    <input name='previous_school' value={updateStudent.previous_school} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Previous School"/>
 
    </div>
    <div>
    <input name='dob' value={updateStudent.dob} onChange={onChange} type="date" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Previous School"/>

    </div>
    <div>
    <select name='clas' value={updateStudent.clas} onChange={onChange} type='text' class="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
  <option selected>Select Student Class</option>
  <option>6th</option>
  <option>7th</option>
  <option>8th</option>
  <option>9th</option>
  <option>10th</option>
</select>

    </div>
    <div>
    <input name='domicile' value={updateStudent.domicile} onChange={onChange} type="text" className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Student Domicile"/>
   
    </div>
    <FileUploader handleChange={handleChange} name="file"  types={fileTypes} />
    <span className=''>{updateStudent?.image}</span>
    </div>
    <button onClick={Update} className='bg-blue-600 text-md px-5 py-3 mt-8 text-white rounded-md'>Update Student</button>
    
    </div>
    
  )
}

export default UpdateStudent
