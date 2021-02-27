import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './app';
import { configureStore } from "./shared/store";
import { loadFromStorage, saveToStorage, getState$ } from "./core/storage";
import {filter, map} from "rxjs/operators";
import _ from 'lodash';
import {fromJS} from "immutable";

const store = configureStore({ widgetAddReducer: fromJS({ widgets: loadFromStorage() })});

getState$(store).pipe(
  map(value => {
    const widgetAddReducer = _.get(value, 'widgetAddReducer', undefined);
    const widgets = widgetAddReducer ? widgetAddReducer.get('widgets').size !== 0 ? widgetAddReducer.get('widgets') : undefined : undefined;
    return widgets;
  }),
  filter(item => item)
).subscribe(saveToStorage);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
document.getElementById("root"));
