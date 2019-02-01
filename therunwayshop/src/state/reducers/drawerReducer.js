import { ACCESS_TOKEN } from "../constants";

const initialState = {
  drawerType: null,
  drawer: {},
  config: {}
};

export default function DrawerReducer (state = initialState, action) {
  switch (action.type) {
    case ACCESS_TOKEN:
      return {
        ...state,
        drawerType: action.payload.access_token
      };
    default:
      return state;
  }
};
