import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { store } from "./state";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { loadUser } from "./state/action-creators";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "./hooks/useTypedSelector";
import axios, { AxiosResponse, AxiosError } from "axios";
import { AuthActionType } from "./state/action-types/AuthActionTypes";

// require("dotenv").config();
const App = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 403) {
        store.dispatch({ type: AuthActionType.VERIFY_FAILURE });
      }
    }
  );

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const auth = useSelector((state) => state.auth);

  return (
    <ChakraProvider theme={theme}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute
              Route
              exact
              path="/dashboard"
              component={Dashboard}
              auth={auth}
            />
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  );
};
export default App;
