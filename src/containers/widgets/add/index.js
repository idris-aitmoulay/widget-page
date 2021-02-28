// @flow
import React from 'react';
import cuid from 'cuid';
import { Steps } from "antd";
import {compose} from "redux";
import { connect } from 'react-redux';
import { steps } from './constants'
import { useInjectReducer } from "../../../shared/store";
import reducer from '../commun/reducer'
import { key } from '../commun/constants'
import { putWidget } from '../commun/action'
import LanguageFormStep from './language-form';
import NameFormStep from './name-form';

const { Step } = Steps;

type Props = {
  putWidgetAction: Function;
};

const AddWidget = ({ putWidgetAction }: Props) => {
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


