// @flow
import { fromJS } from 'immutable/dist/immutable-nonambient';
import {
  CREATE_WIDGET,
  GET_WIDGETS
} from './constants';

const initialState = fromJS({
  widgets: [],
});

function gasoilReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WIDGETS: {
      return state.set('widgets', action.payload);
    }
    case CREATE_WIDGET: {
      return state.set('widgets', [action.payload]);
    }

    default:
      return state;
  }
}

export default gasoilReducer;
