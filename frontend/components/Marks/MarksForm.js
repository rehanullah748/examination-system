import React, { useEffect } from 'react'
import CustomImage from '../Global/CustomImage'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { closeModel } from '@/Store/Reducers/marksReducer';

const MarksForm = ({student}) => {
  const dispatch = useDispatch()
  const [marksId, setMarksId] = React.useState(null)
  const [singleError, setSingleError] = React.useState(null)
  const [errors, setErrors] = React.useState([])
  const [form , setForm ] = React.useState([{id:1, subject: "", marks: "", totalMarks: ""}])
  const [examType, setExamType ] = React.useState("first")
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
   // update-marks
   const { error: updateError, isError: isUpdateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, mutate: updateMutate} = useMutation(data => {
    return axios.put('http://localhost:5001/api/marks/update-marks', data)
  
  })
 
  const updateMarks = () => {
    updateMutate({marks:JSON.stringify(form), examType, reg_no: student.reg_no, session:2024, clas: student.clas, studentId: student._id, _id: marksId})

  }
  //  close update-marks

  const getStudentByExamType = async () => {
    const { data } = await axios.get(`http://localhost:5001/api/marks/get-student-by-examType`, {params:{examType,  reg_no: student.reg_no, clas: student.clas, session: student.session}})
    return data;
  }
  const { error: examErrors, data: examData, isLoading: isExamLoading, isError: isExamError, refetch: refetchExamData } = useQuery(['getStudentByExamType', student.session, examType, student.reg_no, student.clas], getStudentByExamType);
console.log(examData)
  const examChange = (exam) => {
    
    setExamType(exam.target.value)
  }
  const { error, isError, isSuccess, isLoading, mutate, data} = useMutation(data => {
    return axios.post('http://localhost:5001/api/marks/create-marks', data)
  })
  console.log(error)
  const addMarks = () => {
    mutate({marks:JSON.stringify(form), examType, reg_no: student.reg_no, session:2024, clas: student.clas, studentId: student._id})

  }
  useEffect(() => {
if(isError) {
  if(error?.response?.status === 400 && error?.response?.data?.type === "array") {
    setErrors(error.response.data.errors)
  } else if(error?.response?.status === 400 && error?.response?.data?.type === "single") {
    console.log(error?.response?.data?.error)
    setSingleError(error?.response?.data?.error)
  } else {
    setSingleError(error?.response?.data?.error)
  }
  
} else {
setSingleError(null)
setErrors([])
}
  },[isError])

  // update error
  useEffect(() => {
    if(isUpdateError) {
      if(updateError?.response?.status === 400 && updateError?.response?.data?.type === "array") {
        setErrors(updateError.response.data.errors)
      } else if(updateError?.response?.status === 400 && updateError?.response?.data?.type === "single") {
        console.log(updateError?.response?.data?.error)
        setSingleError(updateError?.response?.data?.error)
      } else {
        setSingleError(updateError?.response?.data?.error)
      }
      
    } else {
    setSingleError(null)
    setErrors([])
    }
    if(isUpdateSuccess) {
      dispatch(closeModel())
      toast.success("student marks updated successfully")
      
    }
      },[isError, isUpdateSuccess])
  // close update error
  useEffect(()=> {
    if(isExamError) {
      if(examErrors?.response?.status === 400 ) {
        setErrors(examErrors?.response?.data?.error)
        console.log(examErrors?.response?.data?.error)
      } else {
        setErrors([])
      }
    } 
    if(examData) {
    if(examData?.name === "update") {
      setForm(examData?.exam?.marks)
      setMarksId(examData?.exam?._id)
    } else {
      setForm([{id:1, subject: "", marks: "", totalMarks: ""}])
    }
    } else {
      setForm([{id:1, subject: "", marks: "", totalMarks: ""}])
    }
    if(isSuccess) {
      dispatch(closeModel())
      toast.success("student marks created successfully")
      
    }
  },[isExamError, examData, isSuccess])
 
  console.log(form)
  return (
    <div className=''>
   <div className='flex items-center gap-x-4 '>
   <div className='w-3/12 shadow rounded-full'>
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
     <div className='rounded-xl w-[28.6%] border-2'>
     <select  name='exam' value={examType} onChange={examChange} class=" outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
  <option  selected>Exam Type</option>
  <option value={"first"} className='text bast font-mono'>first Term</option>
  <option value={"mid"} className='text bast font-mono'>Mid Term</option>
  <option value={"final"} className='text bast font-mono'>Final Term</option>
</select>

     </div>
     {singleError &&  <p className='my-3 bg-rose-100 border-rose-200 border rounded-lg px-4 py-3 text-rose-600 font-medium text-sm'>{singleError}</p>}
       {isExamLoading ? <Spinner/> : errors.length !== 0 ? <div className='my-5'>{errors.map((error) => (
        <p className='mb-2 bg-rose-100 border-rose-200 border rounded-lg px-4 py-3 text-rose-600 font-medium text-sm'>{error?.msg}</p>
        
       ))}
       
       </div> :   <div><h1 className='mt-4 text-lg font-medium capitalize'>{examData?.name === "create_exam" ? "add" : examData?.name === "update" ? "update" : ""} marks</h1>{form.map((field, index) => (
        <div className='flex mt-3 items-center gap-4' key={index}>
         
         <input onChange={(e)=>handleChange(field.id,e)} value={field.subject} type="text" name='subject' className=" border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Subject"></input>
         {errors && <span className='text-base bg-rose-500'>{errors.subject}</span>}
         <input onChange={(e)=>handleChange(field.id, e)} value={field.marks} type="Number" name='marks' className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Marks"></input>
         <input onChange={(e)=>handleChange(field.id, e)} value={field.totalMarks} type="Number" name='totalMarks' className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Total Marks"></input>
    
          <button  onClick={() => RemoveSubject(field.id)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Remove
</button>
        </div>
      ))}</div> }
      <div className='flex items-center gap-5'>
      <button  onClick={addSubject} type="button" className=" mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Add Subject
</button>
{isLoading || isUpdateLoading ? <Spinner/> : <button  onClick={examData?.name === "create_exam" ? addMarks : examData?.name === "update" ? updateMarks : ""} type="button" className=" mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-black disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Save Marks
</button>}
      </div>

      </div>
  </div>
  )
}

export default MarksForm