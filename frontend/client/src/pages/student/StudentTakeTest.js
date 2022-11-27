import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTestStudentRoute,
  postTestAnswersRoute,
} from "../../utils/APIRoutes";
import { Input, Button } from "antd";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { getFormatedTime } from "../../helpers";

import loader from "../../assets/loader.gif";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  List,
  ListItemButton,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

function StudentTakeTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [nextBtnShow, setNextBtnShow] = useState(true);
  const [submitBtn, setSubmitBtn] = useState(false);

  let timer;

  const params = useParams();
  const ref = useRef(null);

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  const handleAnswerIsCorrectChange = (questionIndex, answerIndex, event) => {
    let data = [...questions];
    data[questionIndex].professorAnswers[answerIndex][event.target.name] =
      document.querySelector(`.answer_${questionIndex}_${answerIndex}`).checked;

    setQuestions(data);
  };

  const handdleNextQuestionClick = () => {
    console.log(questionIndex);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
    if (questionIndex >= questions.length - 2) {
      setNextBtnShow(false);
      setSubmitBtn(true);
    }
  };

  const handleSubmitButtonClick = () => {
    let studentAnswers = [];
    questions.forEach((question) => {
      question.professorAnswers.forEach((answer) => {
        if (answer.isCorrect == true) {
          studentAnswers.push(answer);
        }
      });
    });

    let answerIDs = [];
    studentAnswers.forEach((answer) => {
      answerIDs.push({ id: answer.id });
    });

    axios
      .post(
        postTestAnswersRoute,
        {
          testId: params.testId,
          selectedStudentAnswers: answerIDs,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              JSON.stringify(localStorage.getItem("access-token"))
            )}`,
          },
        }
      )
      .then((res) => {
        toast.success(`successfully submitet test!`, toastOptions);
        // setTimeout(() => {
        //   navigate(`/professor/subject/tests/${params.subjectId}`);
        // }, 5000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  };

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
          section.questions.forEach((question) => {
            question.professorAnswers.forEach((answer) => {
              answer.isCorrect = false;
            });
            questions.push(question);
          });
        });

        startTimer();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {questions.length != 0 ? (
        <>
          <Card
            sx={{
              maxWidth: 640,
              mx: "auto",
              mt: 3,
              mb: 7,
              "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
            }}
          >
            <CardHeader
              title={
                "Question " + (questionIndex + 1) + "of " + questions.length
              }
              action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
            />
            <Box>
              <LinearProgress
                variant="determinate"
                value={((questionIndex + 1) * 100) / questions.length}
              />
            </Box>
            <CardContent>
              <Typography variant="h6">
                {questions[questionIndex].text}
              </Typography>
              <List>
                {questions[questionIndex].professorAnswers.map(
                  (item, index) => (
                    <ListItemButton key={index}>
                      <div style={{ display: "inline-flex" }}>
                        <div>
                          <b>{String.fromCharCode(65 + index) + " . "}</b>
                        </div>
                        <div style={{ marginLeft: "6px" }}>{item.text}</div>
                        <div>
                          <Input
                            type="checkbox"
                            name="isCorrect"
                            value={item.isCorrect}
                            style={{ marginLeft: "10px" }}
                            className={`answer_${questionIndex}_${index}`}
                            onChange={(event) =>
                              handleAnswerIsCorrectChange(
                                questionIndex,
                                index,
                                event
                              )
                            }
                          />
                        </div>
                      </div>
                    </ListItemButton>
                  )
                )}
              </List>
            </CardContent>
            <Box>
              {nextBtnShow ? (
                <>
                  <Button
                    ref={ref}
                    id="nextQuestionBtn"
                    style={{ margin: "2%" }}
                    onClick={handdleNextQuestionClick}
                  >
                    Next Question
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    ref={ref}
                    id="submitBtn"
                    style={{ margin: "2%" }}
                    onClick={handleSubmitButtonClick}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Box>
          </Card>
          <ToastContainer></ToastContainer>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default StudentTakeTest;
