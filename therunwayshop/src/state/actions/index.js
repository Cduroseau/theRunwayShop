import { LOGIN_SUCCESS, LOGOUT_SUCCESS, ACCESS_TOKEN } from '../constants'

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const onLogout = () => ({
  type: LOGOUT_SUCCESS
})

export const accessToken = () => ({
  type: ACCESS_TOKEN
})