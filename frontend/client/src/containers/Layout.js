import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

function CustomLayout() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {}, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusCircleTwoTone />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Current User</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Savremene obrazovne tehnologije i standardi ©
        </Footer>
      </Layout>
    </Layout>
  );
}

export default CustomLayout;
