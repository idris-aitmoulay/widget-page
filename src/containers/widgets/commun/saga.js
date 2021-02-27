import { takeLatest } from 'redux-saga/effects';
import { SAVE_WIDGET_AT_STORAGE } from "./constants";
export function* saveWidgetAtStorage(action) {
  try {
    const { payload } = action;
    console.log("success")
  } catch (err) {
    console.log("error")
  }
}

export function* getGasoilConsumptionsSaga() {
  yield takeLatest(SAVE_WIDGET_AT_STORAGE, saveWidgetAtStorage);
}

