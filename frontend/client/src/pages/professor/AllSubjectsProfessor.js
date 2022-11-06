import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { getAllSubjectsRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.gif";

function AllSubjectsProfessor() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
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
    },
    {
      title: "MinimumPoints",
      dataIndex: "minimumPoints",
      key: "minimumPoints",
    },
    {
      title: "tests",
      dataIndex: "tests",
      key: "tests",
      render: (text) => <button className="button">all tests</button>,
    },
  ];

  const handleTestsClick = (subjectId) => {
    navigate(`/professor/subject/tests/${subjectId}`);
  };

  useEffect(() => {
    axios
      .get(getAllSubjectsRoute, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
                  handleTestsClick(record.id);
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

export default AllSubjectsProfessor;
