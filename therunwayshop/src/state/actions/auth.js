import { ACCESS_TOKEN } from '../constants'

export const setAccessToken = (accessToken) => ({
  type: ACCESS_TOKEN,
  payload: accessToken
})
