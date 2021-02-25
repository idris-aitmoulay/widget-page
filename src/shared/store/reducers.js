import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';


export default (injectReducers = {}) => combineReducers({ ...injectReducers, form: reduxFormReducer });
