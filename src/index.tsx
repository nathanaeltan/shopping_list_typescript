import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import  App  from "./App";
import { store } from "./state";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
