import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import { getAllSubjectsRoute } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";

function AllSubjectsAdmin() {
  const [subjects, setSubjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "MinimumPoints",
      dataIndex: "minimumPoints",
      key: "minimumPoints",
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
    },
  ];

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("sotis-app-user")));
    axios
      .get(getAllSubjectsRoute, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        setSubjects(res.data);
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
            maxHeight: "400px",
            maxWidth: "400px",
          }}
        />
      ) : (
        <div style={{ color: "black" }}>
          <Table dataSource={subjects} columns={columns} />
        </div>
      )}
    </>
  );
}

export default AllSubjectsAdmin;
