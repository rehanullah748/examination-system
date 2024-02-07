import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentModel: false,
}

export const studentReducer = createSlice({
  name: 'student',
  initialState,
  reducers: {
  
    openModel: (state) => {
      state.studentModel = true;
    },
     closeModel: (state) => {
      state.studentModel = false;
     },
    
  },
})

export const { openModel, closeModel } = studentReducer.actions

export default studentReducer.reducer