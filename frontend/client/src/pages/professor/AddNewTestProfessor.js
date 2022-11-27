import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Space } from "antd";
import { toastOptions } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import {
  PlusOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

import { createTestRoute, getAllProblemsRoute } from "../../utils/APIRoutes";
import { useNavigate, useParams } from "react-router-dom";

function AddNewTestProfessor() {
  const params = useParams();
  const navigate = useNavigate();

  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testMinimumPoints, setTestMinimumPoints] = useState(0);
  const [problemsList, setProblemsList] = useState([]);
  const [sections, setSections] = useState([]);

  const submit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log(sections);
      axios
        .post(
          createTestRoute,
          {
            subjectId: params.subjectId,
            title: testTitle,
            description: testDescription,
            minimumPoints: testMinimumPoints,
            sections: sections,
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
          toast.success(
            `successfully created test: ${res.data.title}`,
            toastOptions
          );
          setTimeout(() => {
            navigate(`/professor/subject/tests/${params.subjectId}`);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message, toastOptions);
        });
    }
  };

  useEffect(() => {
    axios
      .get(getAllProblemsRoute + `/${params.subjectId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        setProblemsList(res.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  }, []);

  function isFormValid() {
    var retFlag = true;
    if (testTitle === "") {
      toast.info("Please enter test title");
      retFlag = false;
      return;
    }
    if (testDescription === "") {
      toast.info("Please enter test description");
      retFlag = false;
      return;
    }
    if (testMinimumPoints <= 0) {
      toast.info("Minimum points for test needs to be greater than zero");
      retFlag = false;
      return;
    }

    if (sections.length <= 0) {
      toast.info("Can't submit no sections for test");
      retFlag = false;
      return;
    }
    sections.forEach((section) => {
      if (section.name === "") {
        toast.info("Please input name for section");
        retFlag = false;
        return;
      }
      section.questions.forEach((question) => {
        if (question.text === "") {
          toast.info("Please input text for question");
          retFlag = false;
          return;
        }
        if (question.pointsPerQuestion <= 0) {
          toast.info("Question need to have non-zero points per question");
          retFlag = false;
          return;
        }
        if (question.problemId === "") {
          toast.info("You need to select a problemID");
          retFlag = false;
          return;
        }
        question.professorAnswers.forEach((answer) => {
          if (answer.text === "") {
            toast.info("Please input answer text");
            retFlag = false;
            return;
          }
        });
      });
    });
    return retFlag;
  }

  const getEmptySection = () => {
    return {
      name: "",
      questions: [getEmptyQuestion()],
    };
  };

  const getEmptyQuestion = () => {
    return {
      text: "",
      pointsPerQuestion: 0,
      problemId: "",
      professorAnswers: [getEmptyAnswer()],
    };
  };

  const getEmptyAnswer = () => {
    return {
      text: "",
      isCorrect: false,
    };
  };

  const handleSectionNameChange = (index, event) => {
    let data = [...sections];
    data[index][event.target.name] = event.target.value;
    setSections(data);
  };

  const addSection = () => {
    let newSection = getEmptySection();
    setSections([...sections, newSection]);
  };

  const removeSection = (index) => {
    let data = [...sections];
    data.splice(index, 1);
    setSections(data);
  };

  const handleQuestionNameChange = (sectionIndex, questionIndex, event) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex][event.target.name] =
      event.target.value;
    setSections(data);
  };

  const handleAnswerTextChange = (
    sectionIndex,
    questionIndex,
    answerIndex,
    event
  ) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex].professorAnswers[answerIndex][
      event.target.name
    ] = event.target.value;
    setSections(data);
  };

  const handleAnswerIsCorrectChange = (
    sectionIndex,
    questionIndex,
    answerIndex,
    event
  ) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex].professorAnswers[answerIndex][
      event.target.name
    ] = document.querySelector(
      `.answer_${questionIndex}_${answerIndex}`
    ).checked;

    setSections(data);
  };

  const handleQuestionPointsPerQuestionChange = (
    sectionIndex,
    questionIndex,
    event
  ) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex][event.target.name] =
      event.target.value;
    setSections(data);
  };

  const handleQuestionProblemIdChange = (
    sectionIndex,
    questionIndex,
    value
  ) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex]["problemId"] = value;
    setSections(data);
  };

  const handleTestTitleChanged = (event) => {
    setTestTitle(event.target.value);
  };

  const handleTestDescriptionChanged = (event) => {
    setTestDescription(event.target.value);
  };

  const handleTestMinimumPointsChanged = (event) => {
    setTestMinimumPoints(event.target.value);
  };

  const addQuestion = (sectionIndex) => {
    let newQuestion = getEmptyQuestion();
    let data = [...sections];
    data[sectionIndex].questions.push(newQuestion);
    setSections(data);
  };

  const addAnswer = (sectionIndex, questionIndex) => {
    let newAnswer = getEmptyAnswer();
    let data = [...sections];
    data[sectionIndex].questions[questionIndex].professorAnswers.push(
      newAnswer
    );
    setSections(data);
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    let data = [...sections];
    data[sectionIndex].questions.splice(questionIndex, 1);
    setSections(data);
  };

  const removeAnswer = (sectionIndex, questionIndex, answerIndex) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex].professorAnswers.splice(
      answerIndex,
      1
    );
    setSections(data);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo.errorFields[0].errors[0], toastOptions);
  };

  return (
    <div className="App">
      <Form
        onSubmit={submit}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "80%",
          maxHeight: "400px",
          maxWidth: "80%",
          marginTop: "1rem",
        }}
        onFinishFailed={onFinishFailed}
      >
        <Space>
          <Input
            name="title"
            placeholder=" Test title"
            onChange={(event) => handleTestTitleChanged(event)}
          />
          <Input
            name="description"
            placeholder="Description"
            onChange={(event) => handleTestDescriptionChanged(event)}
          />
          <Input
            name="minimumPoints"
            placeholder="points"
            onChange={(event) => handleTestMinimumPointsChanged(event)}
            type="number"
          />
        </Space>
        <br />
        <br />
        <div style={{ marginLeft: "3rem" }}>
          {sections.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex}>
                <Form.Item style={{ display: "inline-block" }}>
                  <Input
                    name="name"
                    placeholder="Section name"
                    value={section.name}
                    onChange={(event) =>
                      handleSectionNameChange(sectionIndex, event)
                    }
                  />
                </Form.Item>{" "}
                <MinusCircleOutlined
                  style={{
                    marginLeft: "1rem",
                    marginTop: "0.5rem",
                  }}
                  onClick={() => removeSection(sectionIndex)}
                />{" "}
                Section
                {sections[sectionIndex].questions.map(
                  (question, questionIndex) => {
                    return (
                      <div
                        key={questionIndex}
                        style={{ marginLeft: "2rem", marginTop: "0rem" }}
                      >
                        <Form.Item style={{ display: "inline-block" }}>
                          <Input
                            name="text"
                            placeholder="Question text"
                            value={question.text}
                            onChange={(event) =>
                              handleQuestionNameChange(
                                sectionIndex,
                                questionIndex,
                                event
                              )
                            }
                          />
                        </Form.Item>{" "}
                        <Form.Item
                          style={{
                            display: "inline-block",
                            marginRight: "-4rem",
                          }}
                        >
                          <Input
                            name="pointsPerQuestion"
                            placeholder="points"
                            value={question.pointsPerQuestion}
                            type="number"
                            onChange={(event) =>
                              handleQuestionPointsPerQuestionChange(
                                sectionIndex,
                                questionIndex,
                                event
                              )
                            }
                            style={{ width: "45%" }}
                          />
                        </Form.Item>
                        <Form.Item
                          style={{ display: "inline-block", width: "20%" }}
                          name="problemId"
                          label="Prob ID"
                          value={question.problemId}
                          wrapperCol={{
                            offset: 0,
                            span: 12,
                          }}
                        >
                          <Select
                            placeholder="Select problem Id to bind to question"
                            name="problemId"
                            onChange={(value) =>
                              handleQuestionProblemIdChange(
                                sectionIndex,
                                questionIndex,
                                value
                              )
                            }
                          >
                            {problemsList.map((option) => (
                              <Option key={option.id} value={option.id}>
                                {option.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>{" "}
                        Question
                        <MinusCircleOutlined
                          style={{
                            marginLeft: "1rem",
                            marginTop: "0.5rem",
                          }}
                          onClick={() =>
                            removeQuestion(sectionIndex, questionIndex)
                          }
                        />{" "}
                        <PlusOutlined
                          style={{
                            marginLeft: "1rem",
                            marginTop: "0.5rem",
                          }}
                          onClick={() => addQuestion(sectionIndex)}
                        />{" "}
                        {sections[sectionIndex].questions[
                          questionIndex
                        ].professorAnswers.map((answer, answerIndex) => {
                          return (
                            <div
                              key={answerIndex}
                              style={{ marginLeft: "2rem", marginTop: "0rem" }}
                            >
                              <Form.Item style={{ display: "inline-block" }}>
                                <Input
                                  name="text"
                                  placeholder="Answer text"
                                  value={answer.text}
                                  onChange={(event) =>
                                    handleAnswerTextChange(
                                      sectionIndex,
                                      questionIndex,
                                      answerIndex,
                                      event
                                    )
                                  }
                                />
                              </Form.Item>{" "}
                              Correct
                              <Form.Item
                                style={{
                                  display: "inline-block",
                                  marginLeft: "0.5rem",
                                  marginRight: "2rem",
                                }}
                              >
                                <Input
                                  type="checkbox"
                                  id="isCorrect"
                                  name="isCorrect"
                                  className={`answer_${questionIndex}_${answerIndex}`}
                                  value={answer.isCorrect}
                                  onChange={(event) =>
                                    handleAnswerIsCorrectChange(
                                      sectionIndex,
                                      questionIndex,
                                      answerIndex,
                                      event
                                    )
                                  }
                                />
                              </Form.Item>{" "}
                              Answer
                              <MinusCircleOutlined
                                style={{
                                  marginLeft: "1rem",
                                  marginTop: "0.5rem",
                                }}
                                onClick={() =>
                                  removeAnswer(sectionIndex, questionIndex)
                                }
                              />{" "}
                              <PlusOutlined
                                style={{
                                  marginLeft: "1rem",
                                  marginTop: "0.5rem",
                                }}
                                onClick={() =>
                                  addAnswer(sectionIndex, questionIndex)
                                }
                              />{" "}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>

        <Space style={{ marginBottom: "0.5rem" }}>
          <Form.Item>
            <Button onClick={addSection} style={{ borderRadius: "1rem" }}>
              <PlusCircleOutlined /> Section
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={submit}
              htmlType="submit"
              style={{ borderRadius: "1rem" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default AddNewTestProfessor;
