// @flow
import React from 'react';
import { PATHS } from "../../shared/utils/constants";
import Container from "./container";
import { MapRoutes } from "../../core/routes";
import type { RoutesProps } from "../../core/routes";


const routes: RoutesProps[] = [
  {
    component: Container,
    path: PATHS.widgets,
    exact: true,
    access: 'public',
  }
];

export default MapRoutes(routes)
