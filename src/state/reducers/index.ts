import { combineReducers } from "redux";
import authReducer from "./authReducer";
import shoppinngItemReducer from "./ShoppingItemReducer";
import shoppingListReducer from "./shoppingListReducer";

const reducers = combineReducers({
  auth: authReducer,
  shoppingList: shoppingListReducer,
  shoppingItem: shoppinngItemReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
