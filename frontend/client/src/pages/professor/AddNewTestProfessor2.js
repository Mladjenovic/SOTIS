import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Space } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

import { useNavigate, useParams } from "react-router-dom";

function AddNewTestProfessor() {
  const params = useParams();
  const navigate = useNavigate();
  const subjectId = params.subjectId;

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1rem",
        width: "80%",
      }}
    >
      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <>
                <div
                  key={field.uniqueId}
                  style={{
                    alignItems: "center",
                    display: "Flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    border: "1px solid",
                  }}
                >
                  <Form.Item
                    {...field}
                    label="Title"
                    name={[field.name, "title"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing title",
                      },
                    ]}
                    key={field.uniqueId}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Description"
                    name={[field.name, "description"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing description",
                      },
                    ]}
                    key={field.uniqueId}
                    style={{ marginLeft: "1rem" }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="MinPoints"
                    name={[field.name, "minimumPoints"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing minimumPoints",
                      },
                    ]}
                    key={field.uniqueId}
                    style={{ marginLeft: "1rem" }}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div>
                {/* ----------------------------------------------------------------------------------------------- */}
                {/* ----------------------------------------------------------------------------------------------- */}
                {/* ----------------------------------------------------------------------------------------------- */}
                {/* ----------------------------------------------------------------------------------------------- */}
                {/* ----------------------------------------------------------------------------------------------- */}
                {/* Questions form */}
                <div style={{ border: "1px solid black", margin: "1rem" }}>
                  <Form.List name="questions">
                    {(questionsFields, { add, remove }) => (
                      <>
                        {questionsFields.map((questionField) => (
                          <>
                            <div
                              key={questionField.uniqueId}
                              style={{
                                alignItems: "center",
                                display: "Flex",
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <Form.Item
                                {...questionField}
                                label="text"
                                name={[questionField.name, "text"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing text",
                                  },
                                ]}
                                key={questionField.uniqueId}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                {...questionField}
                                label="Points"
                                name={[questionField.name, "pointsPerQuestion"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing pointsPerQuestion",
                                  },
                                ]}
                                key={questionField.uniqueId}
                                style={{ marginLeft: "1rem" }}
                              >
                                <Input />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => remove(questionField.name)}
                              />
                            </div>
                          </>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add question
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              </>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add sections
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddNewTestProfessor;
