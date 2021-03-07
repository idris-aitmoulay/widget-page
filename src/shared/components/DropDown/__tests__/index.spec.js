import React from 'react';
import Dropdown from '../index';
import { render } from '@testing-library/react';

jest.mock(
  "../../../../../node_modules/antd/lib/select",
  (): any => {

    const Select = ({ children, onChange }) => {
      return <select onChange={e => onChange(e.target.value)}>{children}</select>;
    };

    Select.Option = ({ children, ...otherProps }) => {
      return <option {...otherProps}>{children}</option>;
    };

    return Select;
  },
);

describe('Dropdown', () => {

  it('snap-shoot for DropDown', () => {
    const options = {
      male: 'Male',
      female: 'Female',
    };
    const { container } = render(<Dropdown
        lebel={'Sexe'}
        name={'sexe'}
        options={options}
      />);
    expect(container).toMatchSnapshot();
  });

  it('Drop Down get size of options', () => {
    const options = {
      male: 'Male',
      female: 'Female',
    };
    const { container } = render(<Dropdown
      lebel={'Sexe'}
      name={'sexe'}
      options={options}
    />);
    const optionElements = container.getElementsByTagName('option');
    expect(optionElements.length).toBe(2)
  });
});
