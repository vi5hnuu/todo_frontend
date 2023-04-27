import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://todo-api-vi.onrender.com';//https

const slice = createSlice({
  name: 'todo',
  initialState: { todos: [], pages: 0 },
  reducers: {
    initilize(state, action) {
      state.todos = action.payload
    },
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
    updateTaskStatus(state, action) {
      const ex = state.todos.find(task => task._id === action.payload.id)
      if (ex) {
        ex.isCompleted = action.payload.status
      }
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(task => task._id !== action.payload.id)
    },
    pageCount(state, action) {
      state.pages = action.payload.count
    }
  }
})

//middleware login
export function getPageCount() {
  return async (dispatch, state) => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/tasks/total`, { withCredentials: true })
      if (res.status === 200) {
        dispatch(slice.actions.pageCount({ count: Math.ceil(res.data.total / 10) }))
      }
    } catch (err) {
    }
  }
}
export function getTodos(page) {
  return async (dispatch, state) => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/tasks?page=${page}`, { withCredentials: true })
      if (res.status === 200) {
        console.log(res.data.tasks);
        dispatch(slice.actions.initilize(res.data.tasks))
      }
    } catch (err) {

    }
  }
}
export function updateToDoStatus({ id, status }) {
  return async (dispatch, state) => {
    try {
      const res = await axios.put(`${baseUrl}/api/v1/task/${id}`, { isCompleted: status }, { "withCredentials": true })
      if (res.status === 200) {
        dispatch(slice.actions.updateTaskStatus({ id, status }))
      }
    } catch (err) {

    }
  }
}
export function addTodo({ name, date }) {
  return async (dispatch, state) => {
    try {
      const res = await axios.post(`${baseUrl}/api/v1/task`, { name, date }, { "Content-Type": "application/json", "withCredentials": true })
      dispatch(slice.actions.addTodo(res.data.task))
    } catch (err) {

    }
  }
}
export function deleteTodo({ id }) {
  return async (dispatch, state) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/task/${id}`, { "withCredentials": true })
      dispatch(slice.actions.deleteTodo({ id }))
    } catch (err) {

    }
  }
}

export default slice
export const actions = slice.actions