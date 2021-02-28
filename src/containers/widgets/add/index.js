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
import { key } from '../commun/constants'
import { putWidget } from '../commun/action'
import {compose} from "redux";
import { connect } from 'react-redux';
const { Step } = Steps;
const FormItem = Form.Item;
const AInput = makeField(Input);
const ADropDown = makeField(DropDown);

import LanguageFormStep from './language-form';
import NameFormStep from './name-form';

const options = _.reduce(
  _.keys(languages),
  (cm, cv) => {
    const { name, localName } = languages[cv];
    return {...cm, [cv]: `${name}, ${localName}`}
    }, {}
  );


type Props = {
  putWidgetAction: Function;
  handleSubmit: Function;
  valid: boolean;
};

const AddWidget = ({ handleSubmit, valid, putWidgetAction, reset }: Props) => {
  const [current, setCurrent] = React.useState(0);

  useInjectReducer({ key, reducer });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = (values, reset) => {
    putWidgetAction({ id: cuid() ,...values });
    setCurrent(0);
    if (reset) reset();
  };

  return (
    <div style={{ margin: 40 }}>
      <Steps progressDot current={current}>
        {steps.map(({ title }) => <Step title={title} />)}
      </Steps>
      { current === 0 && <LanguageFormStep onSubmit={next} /> }
      { current === 1 && <NameFormStep onSubmit={onSubmit} onPrevious={prev}/> }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  putWidgetAction: payload => { dispatch(putWidget(payload)); }
});


const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddWidget);


