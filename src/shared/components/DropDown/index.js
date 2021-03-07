import React from 'react';
import { Select } from "antd";
import cuid from 'cuid';
import _ from 'lodash';
const { Option } = Select;

const noop = () => {};

type Props = {
  options: { [key: string]: string };
  name: string;
  label: string;
}

const DropDown = ({ options = [], name, label, ...rest }: Props) => (
  <Select {...rest} label={label} name={name} onBlur={noop}>
    {_.map(options, (item, index) => (
        <Option key={cuid()} value={index}>{item}</Option>
      )
    )}
  </Select>
);

export default DropDown;
