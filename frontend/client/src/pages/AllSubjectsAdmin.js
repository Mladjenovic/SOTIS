import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import { getAllProfesorsRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";

function AllSubjectsAdmin() {
  const [professors, setProfessors] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
  ];
  const data = [
    {
      name: "profa",
      role: 1,
      surname: "profic",
      username: "profa",
    },
    {
      name: "marko",
      role: 1,
      surname: "profic",
      username: "profa",
    },
    {
      name: "petar",
      role: 1,
      surname: "profic",
      username: "profa",
    },
  ];

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <img src={loader} alt="loader" className="loader" />
      ) : (
        <div style={{ color: "black" }}>
          <Table dataSource={data} columns={columns} />
        </div>
      )}
    </>
  );
}

export default AllSubjectsAdmin;
