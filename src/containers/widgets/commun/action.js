import {
  CREATE_WIDGET,
  GET_WIDGETS
} from './constants';

export const putWidget = payload => ({
  type: CREATE_WIDGET,
  payload,
});

export const getWidgets = () => ({
  type: GET_WIDGETS
});

