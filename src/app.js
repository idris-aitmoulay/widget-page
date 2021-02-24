import React from 'react';
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./containers";

const App = () => (
  <Switch>
    <main>
      {renderRoutes(routes)}
    </main>
  </Switch>
);
export default  App;
