import { AuthActionType } from "../action-types/AuthActionTypes";
import { AuthAction } from "../actions/AuthActions";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
  error: string | null;
}
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  userId: localStorage.getItem("userId"),
  error: null,
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
        error: null,
        token: action.payload["token"],
        userId: action.payload["userId"],
      };
    case AuthActionType.LOGIN_FAIL:
    case AuthActionType.REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case AuthActionType.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionType.VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case AuthActionType.VERIFY_FAILURE:
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
