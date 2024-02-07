import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MuiYearsSelect({setSession, session, selectClass, setSelectClass}) {
  console.log(selectClass)
  console.log(session)
  const years = []
  const handleChange = (e) => {
    console.log(e)
   setSession(e.target.value)
  }
  const currentYear = new Date().getFullYear()
  for (let year = currentYear; year >= currentYear - 14; year--) {
    years.push( <MenuItem value={year}>{year}</MenuItem>)
  }
  return (
    <>
    <h1 className='text-base font-medium mb-3 font-sans'>Filter Record</h1>
     <div className='flex items-center space-x-7'>
    <Box sx={{ minWidth: 190 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={session}
          label="Session"
          onChange={handleChange}
        >
            
        {years}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 190 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectClass}
          label="Class"
          onChange={(e)=>setSelectClass(e.target.value)}
        >
          <MenuItem value={"6th"}>6th</MenuItem>
          <MenuItem value={"7th"} >7th</MenuItem>
          <MenuItem value={"8th"} >8th</MenuItem>   
          <MenuItem value={"9th"} >9th</MenuItem>   
          <MenuItem value={"10th"} >10th</MenuItem>   
          <MenuItem value={""} ></MenuItem>   
        
        </Select>
      </FormControl>
    </Box>
    </div>
    </>
   
    
    
  );
}