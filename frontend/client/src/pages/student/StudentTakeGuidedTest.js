import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getTestStudentRoute, guidedTestRoute } from "../../utils/APIRoutes";
import { Input, Button } from "antd";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/constants";
import { getFormatedTime } from "../../helpers";

import loader from "../../assets/loader.gif";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

function StudentTakeGuidedTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [nextBtnShow, setNextBtnShow] = useState(true);
  const [bulkObject, setBulkObject] = useState({});

  let timer;

  const params = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  const handleAnswerIsCorrectChange = (questionIndex, answerIndex, event) => {
    let data = question;
    data.professorAnswers[answerIndex][event.target.name] =
      document.querySelector(`.answer_${questionIndex}_${answerIndex}`).checked;

    setQuestion(data);
  };

  const handdleNextQuestionClick = () => {
    question.professorAnswers.forEach((answer) => {
      if (
        answer.isCorrect &&
        !bulkObject.studentAnswerIds.includes(answer.id)
      ) {
        bulkObject.studentAnswerIds.push(answer.id);
      }
    });

    axios
      .post(guidedTestRoute + `/${params.testId}`, bulkObject, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        if (res.data.isFinalStateReached == true) {
          toast.info("Guided test is finished✅");
          setTimeout(() => {
            navigate(`/student`);
          }, 5000);
        } else {
          if (question.text === res.data.question.text) {
            handdleNextQuestionClick();
          }

          res.data.question.professorAnswers.forEach((answer) => {
            answer.isCorrect = false;
          });

          setQuestion(res.data.question);
          setBulkObject({
            question: res.data.question,
            knowledgeStates: res.data.knowledgeStates,
            studentAnswerIds: [],
          });

          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  };

  useEffect(() => {
    axios
      .post(
        guidedTestRoute + `/${params.testId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              JSON.stringify(localStorage.getItem("access-token"))
            )}`,
          },
        }
      )
      .then((res) => {
        console.log("Res data: ", res.data);
        res.data.question.professorAnswers.forEach((answer) => {
          answer.isCorrect = false;
        });

        setQuestion(res.data.question);
        var obj = {
          question: res.data.question,
          knowledgeStates: res.data.knowledgeStates,
          studentAnswerIds: [],
        };
        console.log("Bulk object: ", obj);

        setBulkObject(obj);

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
      {!isLoading ? (
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
                "You'll keep getting questions until you master the subject!"
              }
              action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
            />
            <Box>
              <LinearProgress variant="determinate" value={100} />
            </Box>
            <CardContent>
              <Typography variant="h6">{question.text}</Typography>
              <List>
                {question.professorAnswers.map((item, index) => (
                  <ListItemButton key={question.id + index}>
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
                          className={`answer_${question.id}_${index}`}
                          onChange={(event) =>
                            handleAnswerIsCorrectChange(
                              question.id,
                              index,
                              event
                            )
                          }
                        />
                      </div>
                    </div>
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
            <Box>
              {nextBtnShow && (
                <>
                  <Button
                    ref={ref}
                    style={{ margin: "2%" }}
                    onClick={handdleNextQuestionClick}
                  >
                    Next Question
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

export default StudentTakeGuidedTest;
