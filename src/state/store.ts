import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducers, { RootState } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// const middleware = [thunk];
export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<RootState>))
);
