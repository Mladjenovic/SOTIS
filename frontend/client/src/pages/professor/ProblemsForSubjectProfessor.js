import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { getAllProblemsRoute } from "../../utils/APIRoutes";
import { Table, Button } from "antd";

import axios from "axios";
import loader from "../../assets/loader.gif";

function ProblemsForSubjectProfessor() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Problem ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SubjectId",
      dataIndex: "subjectId",
      key: "surname",
    },
  ];

  const handleAddNewProblem = () => {
    navigate(`/professor/addNewproblem/${params.subjectId}`);
  };

  useEffect(() => {
    const url = getAllProblemsRoute + `/${params.subjectId}`;
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
            <Button style={{ margin: "0.15rem" }} onClick={handleAddNewProblem}>
              Add new Problem
            </Button>
            <Table dataSource={tableData} columns={columns} rowKey="id" />
          </div>
        </>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default ProblemsForSubjectProfessor;
