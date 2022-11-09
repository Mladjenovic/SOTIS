import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select } from "antd";
const { Option } = Select;
import axios from "axios";

import { toastOptions } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  availableStudentsRoute,
  addNewStudentRoute,
} from "../../utils/APIRoutes";

function AdminAddNewStudent() {
  const params = useParams();
  const navigate = useNavigate();

  const [availableStudents, setAvailableStudents] = useState([]);

  const onFinish = (values) => {
    axios
      .post(
        addNewStudentRoute,
        {
          subjectId: params.subjectId,
          userId: values.studentId,
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
        toast.success(`Successfully added student to subject`, toastOptions);
        setTimeout(() => {
          navigate(`/admin/subjectStudentsInfo/${params.subjectId}`);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error(error.message, toastOptions);
  };

  useEffect(() => {
    axios
      .get(availableStudentsRoute + `/${params.subjectId}/available-students`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAvailableStudents(res.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  }, []);

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
          name="studentId"
          rules={[{ required: true }]}
          label="Select student"
          wrapperCol={{
            offset: 0,
            span: 12,
          }}
        >
          <Select placeholder="Select student to add to subject">
            {availableStudents.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
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
      <ToastContainer></ToastContainer>
    </>
  );
}

export default AdminAddNewStudent;
