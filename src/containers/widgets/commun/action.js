import {
  CREATE_WIDGET,
  DELETE_WIDGET
} from './constants';

export const putWidget = payload => ({
  type: CREATE_WIDGET,
  payload,
});

export const deleteWidget = payload => ({
  type: DELETE_WIDGET,
  payload
});

