import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.gif";

import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { getAllStudentsForSubjectRoute } from "../../utils/APIRoutes";

function AdminSubjectStudentsInfo() {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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

  const handleAddNewStudent = () => {
    navigate(`/admin/addNewStudent/${params.subjectId}`);
  };

  useEffect(() => {
    const url = getAllStudentsForSubjectRoute + `/${params.subjectId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        setTableData(res.data.students);
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
            <Button style={{ margin: "0.15rem" }} onClick={handleAddNewStudent}>
              Add new student
            </Button>
            <Table dataSource={tableData} columns={columns} rowKey="id" />
          </div>
        </>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default AdminSubjectStudentsInfo;
