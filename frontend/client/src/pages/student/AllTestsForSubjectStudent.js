import React, { useState, useEffect } from "react";

import axios from "axios";
import { Table, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";

import { getAllTestForSubjectStudentRoute } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";

function AllTestsForSubjectStudent() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

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
      title: "Action",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleTakeTestClick(record);
              }}
            >
              take
            </button>
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => {
                handleTakeGuidedTestClick(record);
              }}
            >
              guided
            </button>
          </>
        );
      },
    },
  ];

  const handleTakeTestClick = (record) => {
    navigate(`/student/take/test/${record.id}`);
  };

  const handleTakeGuidedTestClick = (record) => {
    navigate(`/student/take/guidedTest/${record.id}`);
  };

  useEffect(() => {
    axios
      .get(getAllTestForSubjectStudentRoute + `/${params.subjectId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        setDataSource(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
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
          <Table dataSource={dataSource} columns={columns} rowKey="id" />
        </div>
      )}
    </>
  );
}

export default AllTestsForSubjectStudent;
