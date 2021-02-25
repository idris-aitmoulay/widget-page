// @flow
import React from 'react';
import { Table, Space, Button, Card, Popconfirm } from 'antd';

import './styles.css';
const { Column } = Table;

const data = [
  { key: '1', name: 'John', language: 'Brown' },
  { key: '2', name: 'John dd', language: 'French' },
  { key: '3', name: 'Johnd', language: 'english' },
  { key: '4', name: 'Johnff', language: 'germany' }
];

type WidgetProps = {
  key: string;
  name: string;
  language: string;
}

type Props = {
  widgets: WidgetProps[]
}

const Widget = ({ widgets = data }: Props) => {

  const onDeleteWidget = item => () => {
    // todo: run delete process.
    console.log(item);
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
              <Space size="middle">
                <Popconfirm title="Sur to delete ?" onConfirm={onDeleteWidget(item)}>
                  <Button type="dashed" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default Widget;