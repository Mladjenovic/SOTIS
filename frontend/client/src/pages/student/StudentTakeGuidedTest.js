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
  const [store, setStore] = useState([]); //combination of questionId & studentAnswerIds
  //const [thresholdCnt, setThresholdCnt] = useState(0); // when we send the same question to backend 10 times, then the threshold is reached

  let timer;

  const params = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  const handleAnswerIsSelectedChange = (questionIndex, answerIndex, event) => {
    let data = question;
    data.professorAnswers[answerIndex][event.target.name] =
      document.querySelector(`.answer_${questionIndex}_${answerIndex}`).checked;

    setQuestion(data);
  };

  async function handleNextQuestionClick() {
    let studentAnswerIds = [];

    // populate studentAnswerIds (question need to be updated with fresh data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!) delete this when it is ensured
    question.professorAnswers.forEach((answer) => {
      if (answer.isSelected) {
        studentAnswerIds.push(answer.id);
      }
    });
    // store quesiton and studentAnswerIds
    store.push({
      questionId: question.id,
      studentAnswerIds: studentAnswerIds,
    });

    // update bulk object (need to be updated with fresh data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!) delete this when it is ensured
    bulkObject.studentAnswerIds = studentAnswerIds;

    let thresholdCnt = 0;
    let shouldRepeatRestCalls = true;
    while (shouldRepeatRestCalls)
    {
      let response_data = await getNextQuestion(bulkObject);
      if (isNewQuestionFromResponseFoundInStore(response_data.question.id)) {
        thresholdCnt += 1; //////////////////////////////////////////////////////////////////////////// question repeated
        if (thresholdCnt > 10) {
          bulkObject.isThresholdReached = true;
          await getNextQuestion(bulkObject);
        }
      } else {

        initializeStates(response_data);
        shouldRepeatRestCalls = false;
      }
    }
  };

  function isNewQuestionFromResponseFoundInStore(questionId) {
    return store.some(element =>  element.questionId === questionId);
  }

  function initializeStates(response_data) {
    response_data.question.professorAnswers.forEach((answer) => {
      answer.isSelected = false;
    });

    setQuestion(response_data.question);
    
    let obj = {
      question: response_data.question,
      knowledgeStates: response_data.knowledgeStates,
      studentAnswerIds: [],
    };
    setBulkObject(obj);
  }

  function getNextQuestion(request_body) {
    return new Promise(function (resolve, reject) {
      axios
      .post(guidedTestRoute + `/${params.testId}`, request_body, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        if (res.data.isFinalStateReached == true) {  ////////////////////////////////////////////////////// isFinalStateReached
          toast.info("Guided test is finished✅");
          setTimeout(() => {
            navigate(`/student`);
          }, 5000);
        } else {
          resolve(res.data)
        }
      },
        (error) => {
        reject(error);
      }
      );
    });
  }


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
        initializeStates(res.data);
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
                          name="isSelected"
                          value={item.isSelected}
                          style={{ marginLeft: "10px" }}
                          className={`answer_${question.id}_${index}`}
                          onChange={(event) =>
                            handleAnswerIsSelectedChange(
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
                    onClick={handleNextQuestionClick}
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
