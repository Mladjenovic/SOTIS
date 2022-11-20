import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getTestStudentRoute } from "../../utils/APIRoutes";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import loader from "../../assets/loader.gif";

function StudentTakeTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const params = useParams();

  useEffect(() => {
    axios
      .get(getTestStudentRoute + `/${params.testId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        res.data.sections.forEach((section) => {
          questions.push(section.questions);
        });

        console.log(questions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  }, []);

  return <div>StudentTakeTest</div>;
}

export default StudentTakeTest;
