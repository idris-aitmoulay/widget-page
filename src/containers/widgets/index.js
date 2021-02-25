// @flow
import React from 'react';
import { PATHS } from "../../shared/utils/constants";
import { MapRoutes } from "../../core/routes";
import type { RoutesProps } from "../../core/routes";
import WidgetList from "./list";
import WidgetAdd from "./add";

const routes: RoutesProps[] = [
  {
    component: WidgetList,
    path: PATHS.home,
    exact: true,
    access: 'public',
  },
  {
    component: WidgetList,
    path: PATHS.widgets,
    exact: true,
    access: 'public',
  },
  {
    component: WidgetAdd,
    path: PATHS.widgetAdd,
    exact: true,
    access: 'public',
  }
];

export default MapRoutes(routes)
