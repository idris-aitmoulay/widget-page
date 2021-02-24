// @flow
import * as React from "react";
import { Route } from "react-router-dom";

const ACCESS = {
  PRIVATE: 'private',
  PUBLIC:'public'
};

export type RoutesProps = {
  component: React.Element;
  path: string;
  access:  ACCESS.PRIVATE | ACCESS.PUBLIC;
  exact: boolean;
  roles?: string[];
}

export type Props = {
  component: React.Node;
  path: string;
  store: any;
};

export const PrivateRoute = (props: Props) => {
  const { component: Component, store, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => <Component {...props} />}
    />

  );
};


export const MapRoutes = (routes: RoutesProps[], Layout: any = React.Fragment) =>
  routes
    .filter(/*apply role*/_ => _)
    .map(props => {
      const { component, ...rest } = props;
      const { access } = rest;
      if (access === ACCESS.PRIVATE) {
        return ({ component: props => Layout({ Component: () => PrivateRoute({ component, ...props })} ),  ...rest });
      }
      return props;
    });
