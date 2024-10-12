import React, { useCallback, useEffect, useState } from "react";

import { Task } from "@interfaces/index";
import { Layout, Typography } from "antd";

import { taskService } from "@services/index";

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const { Header, Content } = Layout;
const { Title } = Typography;

const TaskView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (task: { title: string; description: string }) => {
    //Editar tarea
    if (editingTask) {
      await taskService.updateTask(editingTask.id, task);
      setEditingTask(null);
    } else {
      // crear tarea
      await taskService.createTask(task);
    }
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await taskService.deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <Layout>
      <Header style={{ paddingBottom: 100 }}>
        <Title style={{ color: "white" }}>ToDo List</Title>
      </Header>
      <Content style={{ padding: "50px" }}>
        <TaskForm
          onSubmit={handleSubmit}
          initialValues={editingTask || undefined}
        />
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Content>
    </Layout>
  );
};

export default TaskView;
