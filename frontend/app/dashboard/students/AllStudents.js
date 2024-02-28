'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CustomImage from '@/components/Global/CustomImage';
import TableSkeleton from '@/components/Global/TableSkeleton';
import Model from '@/components/Global/Model';
import { useDispatch } from 'react-redux';
import { openModel } from '@/Store/Reducers/studentReducer';
import MuiYearsSelect from '@/components/MUI/MuiYearsSelect';
import StudentProfile from '@/components/Profile/StudenProfile';



export default function DataTable({auth}) {
  console.log(auth)
  const [details, setDetails ] = React.useState(null)
  const [session, setSession] = React.useState('')
  const [selectClass, setSelectClass] = React.useState('')
    const dispatch = useDispatch()
    const [allStudents, setAllStudents ] = React.useState([])
    const handleDelete = async (id) => {
      console.log(id)
      try {
        await axios.delete(`http://localhost:5001/api/student/delete-student/${id}`)
        const updateStudents = await getStudents()
        setAllStudents(updateStudents)
      } catch (error) {
        console.log(error)
      }
    }
    
    const getStudents = async () => {
      const { data } = await axios.get(`http://localhost:5001/api/student/get-all-students?session=${session}&selectclass=${selectClass}`)
      return data;
    }
    
    const { data, isError, isFetching } = useQuery(["students", session, selectClass], getStudents)
    React.useEffect(() => {
      if(!isError && !isFetching) {
        setAllStudents(data)
      }
      console.log(allStudents)
    },[isError, isFetching])

  const columns = [
    { field: 'reg_no', headerName: 'Reg_no', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
  
    {
      field: 'image', headerName: 'Image', width: 100, renderCell: (params) => {
        console.log(params)
        return (
          <div className='w-10 h-10'>
            <CustomImage url={params.row.image} fallback={'/fallback.png'} />
          </div>
        )
      }
    },
   
   
    {
      field: 'clas',
      headerName: 'class',
      description: 'This column has a value getter and is not sortable.',
      width: 100,
    },
    {
      field: 'phone_no',
      headerName: 'Phone No',
      description: 'This column has a value getter and is not sortable.',
      width: 100,
    },
   
    {
      field: 'update',
      headerName: 'Update',
      width: 100,
      renderCell: (row) => {
        console.log(row)
        return (
          <Link href={{ pathname: "/dashboard/StudentUpdate", query: { id: row.row._id } }}><button type="button" class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-rows-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">Update

          </button></Link>
        )
      }
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (row) => {
        return (
          <button
            type="button"
            className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-rose-800 text-white hover:bg-rows-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-rose-900 dark:focus:ring-offset-rose-800"
            onClick={() => handleDelete(row.row._id)} >
            Delete
          </button>
        );
      }
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 100,
      renderCell: (row) => {
        return (
        <button className="capitalize py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-800 text-white hover:bg-rows-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-blue-900 dark:focus:ring-offset-blue-800" onClick={()=>{
          dispatch(openModel())
          setDetails(row.row)
        }}>details</button>
        );
      }
    }
  ];

  
  
  return (
    <>
    
    <Model>
      <StudentProfile auth={auth} details={details}/>
    </Model>
    <div className="mb-5  w-full lg:w-4/12">
    <MuiYearsSelect setSession={setSession} session={session} setSelectClass={setSelectClass} selectClass={selectClass}/>
    </div>
    
     <div className='bg-white' style={{ height: 400, width: '100%' }}>
      {isFetching ? <TableSkeleton /> : <DataGrid
        rows={allStudents}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSize={[5, 10]}
        checkboxSelection
      />
      }
    </div>
    </>
   
  );
    }