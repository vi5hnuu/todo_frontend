import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const baseUrl = 'https://todo-api-vi.onrender.com';//https

const slice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, username: null, email: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload.username
      state.email = action.payload.email
    },
    logout(state) {
      state.isAuthenticated = false
      state.username = null
      state.email = null
    }
  }
})

//middleware login
export function loginuser(creds) {
  return async (dispatch, state) => {
    try {
      const { email, password } = creds
      const res = await axios.post(`${baseUrl}/api/v1/login`, { email, password }, { withCredentials: true })
      if (res.status === 200) {
        dispatch(slice.actions.login({ username: res.data.user.username, email: res.data.user.email }))
      }
    } catch (err) {

    }
  }
}
export function registerUser(cred) {
  return async (dispatch, state) => {
    const { username, email, password } = cred
    try {
      const res = await axios.post(`${baseUrl}/api/v1/register`, { username, email, password }, { headers: { "Content-Type": "application/json", "withCredentials": true } })
      console.log("register", res);
      dispatch(slice.actions.login({ email, password }))
    } catch (err) {

    }
  }
}
export function logoutUser() {
  return async (dispatch, state) => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/logout`, { withCredentials: true })
      console.log("logout", res);
      dispatch(slice.actions.logout())
    } catch (err) {

    }
  }
}

export default slice
export const actions = slice.actions