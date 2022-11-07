import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../../assets/loader.gif";
import { toastOptions } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAllProfesorsRoute,
  createSubjectRoute,
} from "../../utils/APIRoutes";

function AddNewSbuject() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [professors, setProfessors] = useState([]);

  const navigate = useNavigate();

  const onFinish = (values) => {
    const token = JSON.stringify(localStorage.getItem("access-token"));
    const url = createSubjectRoute + `/${values.profesorForSubject}`;

    axios
      .post(
        url,
        {
          title: values.title,
          description: values.description,
          minimumPoints: values.minimumPoints,
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
          `successfully created subject: ${res.data.title}`,
          toastOptions
        );
        setTimeout(() => {
          navigate("/admin");
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
    setCurrentUser(JSON.parse(localStorage.getItem("sotis-app-user")));
    axios
      .get(getAllProfesorsRoute, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        res.data.forEach((el) => {
          professors.push({
            id: el.id,
            name: el.name,
            role: el.role,
            surname: el.surname,
            username: el.username,
          });
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <img
          src={loader}
          alt="loader"
          className="loader"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
          }}
        />
      ) : (
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
                {professors.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.name}
                  </Option>
                ))}
                {/* <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option> */}
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
        </div>
      )}
    </>
  );
}

export default AddNewSbuject;
