import axios from "axios";
import { Dispatch } from "redux";
import { AuthActionType } from "../action-types/AuthActionTypes";
import { AuthAction } from "../actions/AuthActions";

interface RegisterRequestPayload {
  firstName: string;
  lastName: string;
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
    };
    try {
      const body = JSON.stringify(form);
      const res = await axios.post("/api/v1/users", body, config);
      const payload = {
        token: res.headers.Authorization,
        userId: res.headers.UserID,
      };
      dispatch({
        type: AuthActionType.REGISTER_SUCCESS,
        payload,
      });
    } catch (error) {
      dispatch({
        type: AuthActionType.REGISTER_FAIL,
        payload: error.message,
      });
    }
  };
};
