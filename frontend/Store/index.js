import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './Reducers/studentReducer'
import marksReducer from './Reducers/marksReducer'
export const store = configureStore({
  reducer: {
    studentReducer, marksReducer
  },
})
