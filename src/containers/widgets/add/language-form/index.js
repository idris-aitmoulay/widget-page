// @flow
import React from 'react';
import { Field, reduxForm } from "redux-form";
import _ from 'lodash';
import { Form, Button } from "antd";
import { makeField, DropDown } from '../../../../shared/components';
import { tailFormItemLayout, languages } from '../constants'
const FormItem = Form.Item;
const ADropDown = makeField(DropDown);

const options = _.reduce(
  _.keys(languages),
  (cm, cv) => {
    const { name, localName } = languages[cv];
    return {...cm, [cv]: `${name}, ${localName}`}
  }, {}
);

type Props = {
  onSubmit: Function;
  handleSubmit: Function;
  valid: boolean;
};

const AddWidgetLanguageForm = ({ handleSubmit, valid, onSubmit }: Props) => (
  <form style={{ margin: 40 }} onSubmit={handleSubmit(onSubmit)}>
    <Field
      component={ADropDown}
      label="Language"
      name="language"
      options={options}
      hasFeedback
    />
    <FormItem {...tailFormItemLayout}>
      <Button type={'primary'} disabled={!valid} htmlType="submit" style={{ marginRight: "10px" }}>
        Next
      </Button>
    </FormItem>
  </form>
);

const validate = values => {
  const errors = {};
  if (!values.language) {
    errors.language = "Required";
  }
  return errors;
};


export default reduxForm({
  form: "widget-add",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AddWidgetLanguageForm);


