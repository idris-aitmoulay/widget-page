// @flow
import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Form, Input, Select, Button, Steps } from "antd";
const { Step } = Steps;
const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

const AInput = makeField(Input);
const ASelect = makeField(Select);

const steps = [
  {
    title: 'Language',
  },
  {
    title: 'Name',
  }
];
const AddWidget = props => {
  const { handleSubmit, pristine, reset, submitting, valid } = props;

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <Form style={{ margin: 40 }} onSubmit={handleSubmit}>
      <Steps progressDot current={current}>
        {steps.map(({ title }) => <Step title={title} />)}
      </Steps>
      <div  hidden={current !== 0}>
        <Field label="Language" name="language" component={ASelect}>
          <Option value="ff0000">Red</Option>
          <Option value="00ff00">Green</Option>
          <Option value="0000ff">Blue</Option>
        </Field>
      </div>
      <div hidden={current !== 1}>
        <Field label="name" name="name" component={AInput} placeholder="Name" hasFeedback />
      </div>

      <div className="steps-action">
        <Button hidden={(current === (steps.length - 1))} type="primary" onClick={() => next()}>
          Next
        </Button>
        <Button hidden={(current === 0)} style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
        <FormItem {...tailFormItemLayout}>
          <Button hidden={(current < (steps.length - 1))} type="primary" disabled={!valid} htmlType="submit" style={{ marginRight: "10px" }}>
            Submit
          </Button>
        </FormItem>
      </div>
    </Form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.language) {
    errors.language = "Required";
  }

  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

export default reduxForm({
  form: "simple", // a unique identifier for this form
  validate
})(AddWidget);
