import React from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

function AddNewSbuject() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        style={{ marginTop: "4rem" }}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 12,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input subject title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input subject Description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="MinimumPoints"
          name="minimumPoints"
          rules={[
            {
              required: true,
              message: "Please input subject MinimumPoints!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="profesorForSubject"
          rules={[{ required: true }]}
          label="Select Profesor"
          wrapperCol={{
            offset: 0,
            span: 12,
          }}
        >
          <Select placeholder="Select a option and change input text above">
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddNewSbuject;
