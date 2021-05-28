import { AuthActionType } from "../action-types/AuthActionTypes";
interface AuthPayload {
  token: string;
  userId: string;
}

interface AuthRequest {
  type: AuthActionType.AUTH_REQUEST;
}
interface RegisterSuccessAction {
  type: AuthActionType.REGISTER_SUCCESS;
  payload: AuthPayload;
}

interface RegisterFailureAction {
  type: AuthActionType.REGISTER_FAIL;
  payload: string;
}
interface LoginSuccessAction {
  type: AuthActionType.LOGIN_SUCCESS;
  payload: AuthPayload;
}

interface LoginFailureAction {
  type: AuthActionType.LOGIN_FAIL;
  payload: string;
}

interface VerifyUserSuccess {
  type: AuthActionType.VERIFY_SUCCESS;
}
interface VerifyUserFailure {
  type: AuthActionType.VERIFY_FAILURE;
}

export type AuthAction =
  | AuthRequest
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginSuccessAction
  | LoginFailureAction
  | VerifyUserFailure
  | VerifyUserSuccess;
