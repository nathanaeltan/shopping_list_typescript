import { combineReducers } from "redux";
import authReducer from "./authReducer";
import shoppingListReducer from "./shoppingListReducer";

const reducers = combineReducers({
  auth: authReducer,
  shoppingList: shoppingListReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
