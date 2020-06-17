import { createAction } from "redux-api-middleware";

import * as types from "./types";

// new way of defining fetch action creators via redux-api-middleware
export const login = (username, password) =>
  createAction({
    endpoint: "https://academy-video-api.herokuapp.com/auth/login",
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    types: [types.LOGIN_REQ, types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
  });

export const logout = (token) =>
  createAction({
    endpoint: "https://academy-video-api.herokuapp.com/auth/logout",
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
    types: [types.LOGOUT_REQ, types.LOGOUT_SUCCESS, types.LOGOUT_FAILURE],
  });
