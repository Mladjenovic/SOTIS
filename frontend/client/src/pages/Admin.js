import { Layout, Row, Button, Space, Table, Tag } from "antd";
import React from "react";
const { Sider, Content } = Layout;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

import { PlusOutlined, OrderedListOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

function Admin() {
  return (
    <Layout>
      <Sider
        style={{
          color: "white",
          backgroundColor: "white",
          border: "1px solid",
          marginRight: "1rem",
        }}
      >
        <Row>
          <Button type="primary" ghost style={{ border: "none" }}>
            <OrderedListOutlined />
            <Link to="/admin">&nbsp;All subjects</Link>
          </Button>
        </Row>
        <Row>
          <Button type="primary" ghost style={{ border: "none" }}>
            <Link to="/admin/addSubject">
              <PlusOutlined /> New Subject
            </Link>
          </Button>
        </Row>
      </Sider>
      <Layout
        style={{
          backgroundColor: "white",
          border: "1px solid",
          borderColor: "white",
          marginRight: "20%",
        }}
      >
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
