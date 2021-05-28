import { AuthActionType } from "../action-types/AuthActionTypes";
import { AuthAction } from "../actions/AuthActions";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
}
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  userId: localStorage.getItem("userId"),
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
    case AuthActionType.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload["token"]);
      localStorage.setItem("userId", action.payload["userId"]);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AuthActionType.LOGIN_FAIL:
    case AuthActionType.REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case AuthActionType.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
