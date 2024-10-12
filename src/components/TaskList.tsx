import React from "react";
import { List, Button } from "antd";

import { ListProps } from "@interfaces/index";

const TaskList: React.FC<ListProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={task => (
        <List.Item
          actions={[
            <Button onClick={() => onEdit(task)}>Edit</Button>,
            <Button
              onClick={() => onDelete(task.id)}
              danger>
              Delete
            </Button>,
          ]}>
          <List.Item.Meta
            title={task.title}
            description={task.description}
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
