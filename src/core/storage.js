import { Observable } from "rxjs";

export const saveToStorage = key => state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(key, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromStorage = key => {
  try {
    const serialisedState = localStorage.getItem(key);
    if (serialisedState === null) return [];
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};


export const getState$ = store => {
  return new Observable(function (observer) {
    const unsubscribe = store.subscribe(function () {
      console.log('state', store.getState());
      observer.next(store.getState());
    });
    return unsubscribe;
  });
}
