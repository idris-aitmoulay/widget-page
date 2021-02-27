// @flow
import { fromJS } from 'immutable';
import {
  CREATE_WIDGET,
  GET_WIDGETS
} from './constants';

const initialState = fromJS({
  widgets: [],
});

function widgetReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WIDGETS: {
      return state.set('widgets', action.payload);
    }
    case CREATE_WIDGET: {
      const widgets = state.get('widgets').size === 0 ? [action.payload] : [...state.get('widgets'), action.payload];
      return state.set('widgets', widgets);
    }


    default:
      return state;
  }
}

export default widgetReducer;
