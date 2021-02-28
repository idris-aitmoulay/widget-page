// @flow
import { fromJS } from 'immutable';
import {
  CREATE_WIDGET,
  DELETE_WIDGET
} from './constants';

const initialState = fromJS({
  widgets: [],
});

function widgetReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_WIDGET: {
      const { id: deletedId } = action.payload;
      const widgets = state.toJS().widgets.filter(({ id }) => id !== deletedId);
      return state.set('widgets', widgets);
    }
    case CREATE_WIDGET: {
      const widgets = state.toJS().widgets;
      return state.set('widgets', [...widgets, action.payload]);
    }
    default:
      return state;
  }
}

export default widgetReducer;
