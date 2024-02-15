import React from 'react'
import CustomImage from '../Global/CustomImage'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';



const MarksForm = ({student}) => {
  const [form , setForm ] = React.useState([{id:1, subject: "", marks: "", totalMarks: ""}])
  const [examType, setExamType ] = React.useState("")
  const addSubject = () => {
    setForm([...form, {id: uuidv4(), subject:"", marks: "", totalMarks: ""}])
  }
  const RemoveSubject = (id) => {
    const fields = form.filter(data => data.id !== id)
    setForm(fields)
  }
  const handleChange = (id, e) => {
    const { name, value } = e.target;
    const formCopy = [...form]
    const findFields = formCopy.find((item)=> item.id === id)
    if(findFields) {
      
      const findIndex = formCopy.findIndex((data)=> data.id === id)
      formCopy[findIndex][name] = value 
      setForm(formCopy)
    }
  };
  const examChange = (exam) => {
    
    setExamType(exam.target.value)
  }
  // const { error, isError, isSuccess, isLoading, mutate, data} = useMutation(data => {
  //   return axios.post('http://localhost:5001/api/marks/create-marks', data)
  
  // })
  
  // const addMarks = () => {
  //   mutate([...form], examType)
  return (
    <div className=''>
   <div className='flex items-center gap-x-4 '>
   <div className='w-3/12  rounded-xl shadow-lg  '>
    <CustomImage className='w-6/12' url={student?.image} fallback={'/fallback.png'}/>
   
    
</div>
<div className='border rounded-lg mt-5 w-9/12'>
<div className='border-t flex items-center justify-between w-full p-5'>
<span className='capatalize text-sm font-bold'>Registration No</span>
<span className='capatalize text-sm font-medium'>{student.reg_no}</span>
</div>
<div className='border-t flex items-center justify-between w-full p-5'>
<span className='capitalize text-sm font-bold'> Name</span>
<span className='capitalize text-sm font-medium'>{student.name}</span>
</div>
<div className='border-t flex items-center justify-between w-full p-5'>
<span className='capitalize text-sm font-bold'>Father Name</span>
<span className='capitalize text-sm font-medium'>{student.f_name}</span>
</div>


<div className='border-t flex items-center justify-between w-full p-5'>
<span className='capatalize text-sm font-bold'>Class</span>
<span className='capatalize text-sm font-medium'>{student.clas}</span>
</div>
</div>
   </div>



     <div className='mt-10'> 
     <div className='rounded-xl w-[43.5%] border-2'>
     <select name='exam' value={examType.exam} onChange={examChange} class=" outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
  <option selected>Exam Type</option>
  <option value={"first"} className='text bast font-mono'>first Term</option>
  <option value={"mid"} className='text bast font-mono'>Mid Term</option>
  <option value={"final"} className='text bast font-mono'>Final Term</option>
</select>
     </div>

       {form.map((field, index) => (
        <div className='flex mt-3 items-center gap-4' key={index}>
         
         <input onChange={(e)=>handleChange(field.id,e)} value={field.subject} type="text" name='subject' className=" border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Subject"></input>
         <input onChange={(e)=>handleChange(field.id, e)} value={field.marks} type="Number" name='marks' className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Marks"></input>
         <input onChange={(e)=>handleChange(field.id, e)} value={field.totalMarks} type="Number" name='totalMarks' className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Total Marks"></input>
    
          <button  onClick={() => RemoveSubject(field.id)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Remove
</button>
        </div>
      ))}
      <div className='flex items-center gap-5'>
      <button  onClick={addSubject} type="button" className=" mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Add Subject
</button>
<button   type="button" className=" mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-black disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Save Marks
</button>
      </div>

      </div>
  </div>
  )
}

export default MarksForm