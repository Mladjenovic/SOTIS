import { Layout, Row, Button } from "antd";
import React from "react";
const { Sider, Content } = Layout;

import { BrowserRouter as Router, Link, Outlet } from "react-router-dom";

import { PlusOutlined, OrderedListOutlined } from "@ant-design/icons";

function Admin() {
  return (
    <Layout>
      <Sider
        style={{
          color: "white",
          backgroundColor: "#001529",
          border: "1px solid",
          marginRight: "1rem",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
          borderColor: "#001529",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <Content style={{ backgroundColor: "#e6f7ff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
