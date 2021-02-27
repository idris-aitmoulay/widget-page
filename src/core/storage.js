import { Observable } from "rxjs";

export const saveToStorage = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("state", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromStorage = () => {
  try {
    const serialisedState = localStorage.getItem("state");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};


export const getState$ = store => {
  return new Observable(function (observer) {
    const unsubscribe = store.subscribe(function () {
      observer.next(store.getState());
    });
  });
}
