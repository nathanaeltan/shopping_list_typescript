import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}: any) => {
  return (
    <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
