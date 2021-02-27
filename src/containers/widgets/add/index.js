// @flow
import React from 'react';
import { Field, reduxForm } from "redux-form";
import _ from 'lodash';
import cuid from 'cuid';
import { Form, Input, Button, Steps } from "antd";
import { makeField, DropDown } from '../../../shared/components';
import { steps, tailFormItemLayout, languages } from './constants'
import { useInjectReducer } from "../../../shared/store";
import reducer from '../commun/reducer'
import { putWidget } from '../commun/action'
import {compose} from "redux";
import { connect } from 'react-redux';
const { Step } = Steps;
const FormItem = Form.Item;
const AInput = makeField(Input);
const ADropDown = makeField(DropDown);

const options = _.reduce(
  _.keys(languages),
  (cm, cv) => {
    const { name, localName } = languages[cv];
    return {...cm, [cv]: `${name}, ${localName}`}
    }, {}
  );

const key: string = 'widgetAddReducer';

type Props = {
  putWidgetAction: Function;
  handleSubmit: Function;
  valid: boolean;
};

const AddWidget = ({ handleSubmit, valid, putWidgetAction }: Props) => {
  const [current, setCurrent] = React.useState(0);

  useInjectReducer({ key, reducer });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = values => {
    putWidgetAction({ id: cuid() ,...values });
  };

  return (
    <form style={{ margin: 40 }} onSubmit={handleSubmit(onSubmit)}>
      <Steps progressDot current={current}>
        {steps.map(({ title }) => <Step title={title} />)}
      </Steps>
      <div hidden={current !== 0}>
        <Field
          component={ADropDown}
          label="Language"
          name="language"
          options={options}
          hasFeedback
        />
      </div>
      <div hidden={current !== 1}>
        <Field label="name" name="name" component={AInput} placeholder="Name" hasFeedback />
      </div>
      <div>
        <Button hidden={(current === (steps.length - 1))} type="primary" onClick={() => next()}>
          Next
        </Button>
        <Button hidden={(current === 0)} style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
        <FormItem {...tailFormItemLayout}>
          <Button hidden={(current < (steps.length - 1))} type={'primary'} disabled={!valid} htmlType="submit" style={{ marginRight: "10px" }}>
            Submit
          </Button>
        </FormItem>
      </div>
    </form>
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

const mapDispatchToProps = dispatch => ({
  putWidgetAction: payload => { dispatch(putWidget(payload)); }
});


const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(reduxForm({
  form: "widget-add",
  validate
})(AddWidget));


