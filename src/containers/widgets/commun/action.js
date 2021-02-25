import {
  CREATE_WIDGET,
  GET_WIDGETS
} from './constants';

export const createWidget = payload => ({
  type: CREATE_WIDGET,
  payload,
});

export const getWidgets = payload => ({
  type: GET_WIDGETS,
  payload,
});

