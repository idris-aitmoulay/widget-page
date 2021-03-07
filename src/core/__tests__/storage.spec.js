import { saveToStorage, loadFromStorage } from '../storage';

describe('Local Storage', () => {
  const data = [{ key: '1', value: '1' }];
  const key = 'widgets';
  it('check if localStorage.setItem is called', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    saveToStorage(key)(data);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('check if localStorage.getItem is called', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify(data));
    const parseSpy = jest.spyOn(JSON, 'parse').mockImplementation(() => data);

    loadFromStorage(key);
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(parseSpy).toHaveBeenCalled();
  });


  it('test if loadFromStorage failed when there is parsing error', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify(data));
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const parseSpy = jest.spyOn(JSON, 'parse').mockImplementation(() => { throw new Error('JSON parse')});
    loadFromStorage(key);
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(parseSpy).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
  });
});


