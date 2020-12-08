import React, { ComponentType, useContext } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { AuthStateContext } from '../contexts/AuthProvider';

interface IDynamicRouteProps extends RouteComponentProps {
  component: ComponentType<Partial<IDynamicRouteProps>>;
  authenticated: boolean;
  redirectTo: string;
  exact: boolean;
  path: string;
}

const DynamicRoute = ({
  component: Component,
  redirectTo,
  authenticated,
  ...rest
}: Partial<IDynamicRouteProps>): JSX.Element => {
  const { username } = useContext(AuthStateContext);
  return (
    <Route
      {...rest}
      render={(props: Partial<IDynamicRouteProps>) => {
        if (authenticated) {
          return username ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirectTo} />
          );
        } else {
          return username ? (
            <Redirect to={redirectTo} />
          ) : (
            <Component {...props} />
          );
        }
      }}
    />
  );
};

export default DynamicRoute;
