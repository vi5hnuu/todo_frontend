import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import taskSlice from './todo_slice'


//thunks


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    task: taskSlice.reducer
  }
})

export default store