import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  PlusCircleTwoTone,
  LogoutOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

import Login from "../pages/general/Login";
import Register from "../pages/general/Register";
import Home from "../pages/general/Home";
import Admin from "../pages/admin/Admin";
import AllSubjectsAdmin from "../pages/admin/AllSubjectsAdmin";
import AddNewSbuject from "../components/admin/AddNewSbuject";
import Professor from "../pages/professor/Professor";
import AllSubjectsProfessor from "../pages/professor/AllSubjectsProfessor";

function CustomLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("sotis-app-user")) {
      navigate("/");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("sotis-app-user")));
    }
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = async () => {
    localStorage.removeItem("sotis-app-user");
    navigate(0);
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          {!currentUser && (
            <Menu.Item key="2" icon={<PlusCircleTwoTone />}>
              <Link to="/register">Register</Link>
            </Menu.Item>
          )}
          {!currentUser && (
            <Menu.Item key="3" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}

          {currentUser && (
            <Menu.Item key="4" icon={<LogoutOutlined />}>
              <div onClick={handleLogout}>Logout</div>
            </Menu.Item>
          )}
          {currentUser && currentUser.Role === 0 && (
            <Menu.Item key="5" icon={<BookOutlined />}>
              <Link to="/admin">Subjects</Link>
            </Menu.Item>
          )}
          {currentUser && currentUser.Role === 1 && (
            <Menu.Item key="6" icon={<BookOutlined />}>
              <Link to="/professor">Subjects</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          {currentUser && (
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>
                {currentUser.Name} Role {currentUser.Role}
              </Breadcrumb.Item>
            </Breadcrumb>
          )}

          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              {/* General routes */}
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              {/* Admin routes */}
              <Route exact path="/admin" element={<Admin />}>
                <Route path="/admin" element={<AllSubjectsAdmin />} />
                <Route path="/admin/addSubject" element={<AddNewSbuject />} />
                <Route path="*" element={<AllSubjectsAdmin />} />
              </Route>
              {/* Professor routes */}
              <Route exact path="/professor" element={<Professor />}>
                <Route path="/professor" element={<AllSubjectsProfessor />} />
                <Route path="*" element={<AllSubjectsAdmin />} />
              </Route>
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
