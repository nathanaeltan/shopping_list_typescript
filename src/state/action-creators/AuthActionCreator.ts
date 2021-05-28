import axios from "axios";
import { Dispatch } from "redux";
import { AuthActionType } from "../action-types/AuthActionTypes";
import { AuthAction } from "../actions/AuthActions";
require("dotenv").config();

interface RegisterRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginRequestPayload {
  email: string;
  password: string;
}

export const register = (form: RegisterRequestPayload) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionType.AUTH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const body = JSON.stringify(form);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/users",
        body,
        config
      );

      const payload = {
        token: res.headers.authorization,
        userId: res.headers.userid,
      };
      dispatch({
        type: AuthActionType.REGISTER_SUCCESS,
        payload,
      });
    } catch (error) {
      console.log(error.response, "ERROR IN REGISTER");
      dispatch({
        type: AuthActionType.REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const login =
  (form: LoginRequestPayload) => async (dispatch: Dispatch<AuthAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const body = JSON.stringify(form);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/users/login",
        body,
        config
      );

      const payload = {
        token: res.headers.authorization,
        userId: res.headers.userid,
      };
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload,
      });
    } catch (error) {
      console.log(error.response, "ERROR IN REGISTER");
      dispatch({
        type: AuthActionType.LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch: Dispatch<AuthAction>) => {
  if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    dispatch({
      type: AuthActionType.VERIFY_SUCCESS,
    });
  } else {
    dispatch({
      type: AuthActionType.VERIFY_FAILURE,
    });
  }
};
