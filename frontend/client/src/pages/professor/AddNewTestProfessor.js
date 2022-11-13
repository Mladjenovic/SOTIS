import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Space, Divider } from "antd";
import $ from "jquery";

import {
  PlusOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

import { useNavigate, useParams } from "react-router-dom";

function AddNewTestProfessor() {
  const params = useParams();
  const navigate = useNavigate();
  const subjectId = params.subjectId;

  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testMinimumPoints, setTestMinimumPoints] = useState(0);
  const [sections, setSections] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    console.log(sections);
  };

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
      answers: [getEmptyAnswer()],
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
    data[sectionIndex].questions[questionIndex].answers[answerIndex][
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
    data[sectionIndex].questions[questionIndex].answers[answerIndex][
      event.target.name
    ] = document.querySelector(`.answer_${answerIndex}`).checked;

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

  const handleTestTitleChanged = (event) => {
    setTestTitle(event.target.value);
  };

  const handleTestDescriptionChanged = (event) => {
    setTestDescription(event.target.value);
  };

  const handleTestMinimumPointsChanged = (event) => {
    setTestMinimumPoints(event.target.value);
    console.log(event.target.value);
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
    data[sectionIndex].questions[questionIndex].answers.push(newAnswer);
    setSections(data);
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    let data = [...sections];
    data[sectionIndex].questions.splice(questionIndex, 1);
    setSections(data);
  };
  const removeAnswer = (sectionIndex, questionIndex, answerIndex) => {
    let data = [...sections];
    data[sectionIndex].questions[questionIndex].answers.splice(answerIndex, 1);
    setSections(data);
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
      >
        <Divider>
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
        </Divider>
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
                      ].answers.map((answer, answerIndex) => {
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
                                className={`answer_${answerIndex}`}
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
        <Space style={{ marginBottom: "0.5rem" }}>
          <Button onClick={addSection} style={{ borderRadius: "1rem" }}>
            <PlusCircleOutlined /> Section
          </Button>
          <Button onClick={submit} style={{ borderRadius: "1rem" }}>
            Submit
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default AddNewTestProfessor;
