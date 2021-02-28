// @flow
import React from 'react';
import { Table, Button, Card, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import './styles.css';
import {useInjectReducer} from "../../../shared/store";
import {key} from "../commun/constants";
import { makeSelectWidgets } from "../commun/selector";
import reducer from "../commun/reducer";
import {deleteWidget} from "../commun/action";
const { Column } = Table;

type WidgetProps = {
  key: string;
  name: string;
  language: string;
}

type Props = {
  widgets: WidgetProps[];
  deleteWidgetAction: Function;
}

const Widget = ({ widgets, deleteWidgetAction }: Props) => {
  useInjectReducer({ key, reducer });

  const onDeleteWidget = item => () => {
    deleteWidgetAction(item);
  };

  return (
    <div className={'widgets-container'}>
      <Card title="Widget list" extra={
        <Button type="link" primary href={'/#/widget/add'}>
          Add
        </Button>
      }>
        <Table dataSource={widgets}>
          <Column title="name" dataIndex="name" key="name" />
          <Column title="language " dataIndex="language" key="language " />
          <Column
            title="Action"
            key="action"
            render={(item) => (
              <Popconfirm title="Sur to delete ?" onConfirm={onDeleteWidget(item)}>
                <Button type="dashed" danger>
                  Delete
                </Button>
              </Popconfirm>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteWidgetAction: payload => { dispatch(deleteWidget(payload)); }
});

const mapStateToProps = createStructuredSelector({
  widgets: makeSelectWidgets(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Widget);
