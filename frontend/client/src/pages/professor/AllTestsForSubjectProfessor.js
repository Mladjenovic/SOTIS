import React, { useState, useEffect } from "react";

import axios from "axios";
import { Table, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

import {
  getAllTestForSubjectRoute,
  downlaodTestResultCsvRoute,
} from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";
import { CloudDownloadOutlined } from "@ant-design/icons";

function AllTestsForSubjectProfessor() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const headers = [
    { label: "StudentUsername", key: "studentUsername" },
    { label: "StudentName", key: "studentName" },
    { label: "StudentSurname", key: "studentSurname" },
    { label: "DateTime", key: "dateTime" },
    { label: "Points", key: "points" },
  ];

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    { key: "2", title: "Title", dataIndex: "title", key: "title" },
    { key: "3", title: "SubjectId", dataIndex: "subjectId", key: "surname" },
    {
      key: "4",
      title: "MinimumPoints",
      dataIndex: "minimumPoints",
      key: "minimumPoints",
    },
    {
      key: "5",
      title: "Download",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleDownloadTestResultsClick(record);
              }}
            >
              <CloudDownloadOutlined />
              <p>Result</p>
            </button>
          </>
        );
      },
    },
  ];

  const handleDownloadTestResultsClick = (record) => {
    axios
      .get(`${downlaodTestResultCsvRoute}/${record.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        var testResultCsvData = res.data.split("\n");
        var csvFileData = testResultCsvData.slice(1, testResultCsvData.length);
        var csv = testResultCsvData[0];

        csvFileData.forEach((row) => {
          csv += row.split(",");
          csv += "\n";
        });

        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";

        //provide the name for the CSV file to be downloaded
        hiddenElement.download = `${record.title}.csv`;
        hiddenElement.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
