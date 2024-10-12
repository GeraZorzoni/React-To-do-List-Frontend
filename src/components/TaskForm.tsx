import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

import { FormProps } from "@interfaces/index";

const TaskForm: React.FC<FormProps> = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      onSubmit(values);
      form.resetFields();
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSubmit}>
      <Form.Item
        name='title'
        label='Task Title'
        rules={[{ required: true, message: "Please input the task title!" }]}>
        <Input placeholder='Enter task title' />
      </Form.Item>

      <Form.Item
        name='description'
        label='Task Description'
        rules={[{ required: true, message: "Please input the task description!" }]}>
        <Input placeholder='Enter task description' />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={submitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
