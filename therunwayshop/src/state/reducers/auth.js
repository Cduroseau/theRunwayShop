import { LOGIN_SUCCESS, LOGOUT_SUCCESS, ACCESS_TOKEN } from '../constants'
const initialState = {
  isLoggedIn: false,
  access_token: ''
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
    case ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload
      }
    default:
      return state
  }
}