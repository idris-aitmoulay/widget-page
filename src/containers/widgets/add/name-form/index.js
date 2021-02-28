// @flow
import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button } from "antd";
import { makeField } from '../../../../shared/components';
import { tailFormItemLayout } from '../constants'

const FormItem = Form.Item;
const AInput = makeField(Input);

type Props = {
  onSubmit: Function;
  onPrevious: Function;
  handleSubmit: Function;
  valid: boolean;
};

const AddWidgetNameForm = ({ handleSubmit, valid, onSubmit, onPrevious, reset }: Props) => {
  const onHandleSubmit = event => {
    if (onSubmit) onSubmit(event, reset);
  };
  return (
    <form style={{ margin: 40 }} onSubmit={handleSubmit(onHandleSubmit)}>
      <Field label="name" name="name" component={AInput} placeholder="Name" hasFeedback />
      <FormItem {...tailFormItemLayout}>
        <Button type={'secondary'} style={{ marginRight: "10px" }} onClick={onPrevious}>
          Previous
        </Button>
        <Button type={'primary'} disabled={!valid} htmlType="submit" style={{ marginRight: "10px" }}>
          Submit
        </Button>
      </FormItem>
    </form>
  );
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};


export default reduxForm({
  form: "widget-add",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AddWidgetNameForm);


