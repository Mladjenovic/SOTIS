import axios from "axios";
import { Table } from "antd";
import loader from "../../assets/loader.gif";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllSubjectsForStudentRoute } from "../../utils/APIRoutes";

function AllSubjectsStudent() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "4",
      title: "MinimumPoints",
      dataIndex: "minimumPoints",
    },
    {
      key: "5",
      title: "All tests",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleTestsClick(record);
              }}
            >
              tests
            </button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(getAllSubjectsForStudentRoute, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDataSource(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTestsClick = (record) => {
    navigate(`/student/subject/tests/${record.id}`);
  };

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
          <Table dataSource={dataSource} columns={columns} rowKey="id" />
        </div>
      )}
    </>
  );
}

export default AllSubjectsStudent;
