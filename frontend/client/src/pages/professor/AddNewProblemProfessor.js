import React from "react";

import axios from "axios";
import { Button, Form, Input } from "antd";
import { createNewProblemRoute } from "../../utils/APIRoutes";
import { useParams, useNavigate } from "react-router-dom";

import { toastOptions } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewProblemProfessor() {
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const url = createNewProblemRoute;

    axios
      .post(
        url,
        {
          name: values.name,
          subjectId: params.subjectId,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              JSON.stringify(localStorage.getItem("access-token"))
            )}`,
          },
        }
      )
      .then((res) => {
        toast.success(
          `successfully created problem: ${res.data.name}`,
          toastOptions
        );
        setTimeout(() => {
          navigate(`/professor/subject/problems/${params.subjectId}`);
        }, 3500);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  };

  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo.errorFields[0].errors[0], toastOptions);
  };

  return (
    <>
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input subject name!",
            },
          ]}
        >
          <Input />
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
      <ToastContainer></ToastContainer>
    </>
  );
}

export default AddNewProblemProfessor;
