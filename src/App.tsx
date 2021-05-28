import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./state";
import Login from "./pages/Login";
import Register from "./pages/Register";
export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  </Provider>
);
