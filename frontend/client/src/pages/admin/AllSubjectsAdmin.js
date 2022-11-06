import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { getAllSubjectsRoute } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";
import { useNavigate } from "react-router-dom";

import "./admin.css";

function AllSubjectsAdmin() {
  const [subjects, setSubjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text}</div>,
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
      render: (text) => <button className="button">students</button>,
    },
  ].filter((item) => !item.hidden);

  const hanldeStudentsClick = (subjectId) => {
    navigate(`/admin/subjectStudentsInfo/${subjectId}`);
  };

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
          <Table
            dataSource={subjects}
            columns={columns}
            rowKey="id"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log(record.id);
                  hanldeStudentsClick(record.id);
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
        </div>
      )}
    </>
  );
}

export default AllSubjectsAdmin;
