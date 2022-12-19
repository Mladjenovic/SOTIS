import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getAllSubjectsRoute,
  knogledgeSpacesRoute,
} from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.gif";

import { Table } from "antd";

function AllSubjectsProfessor() {
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
    {
      key: "6",
      title: "Add problem",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleAddProblemClick(record);
              }}
            >
              problems
            </button>
          </>
        );
      },
    },
    {
      key: "7",
      title: "Graph",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleGraphClick(record);
              }}
            >
              graph
            </button>
          </>
        );
      },
    },
    {
      key: "7",
      title: "Compare",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleCompareGraphsClick(record);
              }}
            >
              Compare
            </button>
          </>
        );
      },
    },
    {
      key: "8",
      title: "Simu call",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleSimuCallClick(record);
              }}
            >
              {" "}
              simu
            </button>
          </>
        );
      },
    },
  ];

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
        setDataSource(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTestsClick = (record) => {
    navigate(`/professor/subject/tests/${record.id}`);
  };
  const handleAddProblemClick = (record) => {
    navigate(`/professor/subject/problems/${record.id}`);
  };
  const handleGraphClick = (record) => {
    navigate(`/professor/subject/graph/${record.id}`);
  };
  const handleCompareGraphsClick = (record) => {
    navigate(`/professor/subject/graphCompare/${record.id}`);
  };

  const handleSimuCallClick = (record) => {
    axios
      .put(
        knogledgeSpacesRoute + `/${record.id}` + "/real/simu",
        {}, // axios wants this to be empty, cause it's a put req and you are supposed to send actual data to be...
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              JSON.stringify(localStorage.getItem("access-token"))
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

export default AllSubjectsProfessor;
