import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  marksModel: false,
}

export const marksReducer = createSlice({
  name: 'marks',
  initialState,
  reducers: {
  
    openModel: (state) => {
      state.marksModel = true;
    },
     closeModel: (state) => {
      state.marksModel = false;
     },
    
  },
})

export const { openModel, closeModel } = marksReducer.actions

export default marksReducer.reducer