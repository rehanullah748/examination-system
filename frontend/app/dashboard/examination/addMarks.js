'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import axios from 'axios';
import CustomImage from '@/components/Global/CustomImage';
import TableSkeleton from '@/components/Global/TableSkeleton';
import { useDispatch } from 'react-redux';
import { openModel } from '@/Store/Reducers/marksReducer';
import MuiYearsSelect from '@/components/MUI/MuiYearsSelect';
import MarksModel from '@/components/Global/MarksModel';
import MarksForm from '@/components/Marks/MarksForm';

export default function DataTable({auth}) {
  console.log(auth)
 const [student, setStudent] = React.useState('')
  const [session, setSession] = React.useState(new Date().getFullYear())
  const [selectClass, setSelectClass] = React.useState('6th')
    const dispatch = useDispatch()
    const [allStudents, setAllStudents ] = React.useState([])
  
    
    const getStudents = async () => {
     
        const { data } = await axios.get(`http://localhost:5001/api/marks/get-all-students-for-marks?session=${session}&selectclass=${selectClass}`)
      return data;
      
      
    }
    
    const { data, isError, isFetching } = useQuery(["students", session, selectClass], getStudents)
    React.useEffect(() => {
      if(!isError && !isFetching) {
        setAllStudents(data)
      }
      console.log(allStudents)
    },[isError, isFetching])
    const Check = (data) => {
       setStudent(data)
        dispatch(openModel())
    }

  const columns = [
    { field: 'reg_no', headerName: <span className='font-medium text-sm'>Reg_No</span>, width: 120 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'f_name', headerName: 'Father Name', width: 120 },
    {
      field: 'image', headerName: 'Image', width: 130, renderCell: (params) => {
        console.log(params)
        return (
          <div className='w-10 h-10'>
            <CustomImage url={params.row.image} fallback={'/fallback.png'} />
          </div>
        )
      }
    },
   
    {
      field: 'address',
      headerName: 'address',
      width: 120,
    },
    {
      field: 'clas',
      headerName: 'class',
      description: 'This column has a value getter and is not sortable.',
      width: 120,
    },
    
   
    
    {
      field: 'addMarks',
      headerName: 'Add Marks',
      width: 120,
      renderCell: (row) => {
        return (
        <button className="capitalize py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-800 text-white hover:bg-rows-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-blue-900 dark:focus:ring-offset-blue-800" onClick={()=>Check(row.row)}>Add Marks</button>
        );
      }
    }
  ];

  
  
  return (
    <>
    
    <MarksModel>
     <MarksForm student={student}/>
    </MarksModel>
    <div className="mb-5 w-full lg:w-4/12">
  <MuiYearsSelect setSession={setSession} session={session} setSelectClass={setSelectClass} selectClass={selectClass}/></div>
    
    
     <div className='bg-white' style={{ height: 400, width: '90%' }}>
      {isFetching ? <div className='p-5'><TableSkeleton /></div> : <DataGrid
        rows={allStudents}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
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