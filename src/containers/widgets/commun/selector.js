import { createSelector } from 'reselect';
import _ from 'lodash';
import { key } from './constants';

const selectWidgets = state => _.get(state, key, undefined);

export const makeSelectWidgets = () =>
  createSelector(selectWidgets, widgetsSelector => _.get(widgetsSelector?.toJS(), 'widgets', []));
