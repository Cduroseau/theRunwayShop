import { ACCESS_TOKEN } from "../constants";

export const accessToken = payload => {
  return {
    type: ACCESS_TOKEN,
    payload
  };
};
