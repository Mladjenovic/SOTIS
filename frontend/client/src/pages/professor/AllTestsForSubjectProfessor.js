import React, { useState, useEffect } from "react";

import axios from "axios";
import { Table, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";

import { getAllTestForSubjectRoute } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";

function AllTestsForSubjectProfessor() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "SubjectId",
      dataIndex: "subjectId",
      key: "surname",
    },
    {
      title: "MinimumPoints",
      dataIndex: "minimumPoints",
      key: "minimumPoints",
    },
  ];

  const handleAddNewTest = () => {
    navigate(`/professor/addNewTest/${params.subjectId}`);
  };

  useEffect(() => {
    const url = getAllTestForSubjectRoute + `/${params.subjectId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTableData(res.data);
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
        <>
          <div style={{ color: "black" }}>
            <Button style={{ margin: "0.15rem" }} onClick={handleAddNewTest}>
              Add new test
            </Button>
            <Table dataSource={tableData} columns={columns} rowKey="id" />
          </div>
        </>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default AllTestsForSubjectProfessor;
