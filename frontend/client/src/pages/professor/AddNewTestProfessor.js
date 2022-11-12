import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Space } from "antd";
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

  const addQuestion = (sectionIndex) => {
    let newQuestion = getEmptyQuestion();
    let data = [...sections];
    data[sectionIndex].questions.push(newQuestion);
    setSections(data);
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    let data = [...sections];
    data[sectionIndex].questions.splice(questionIndex, 1);
    setSections(data);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        {sections.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex}>
              <button onClick={() => removeSection(sectionIndex)}>
                Remove Section
              </button>
              <input
                name="name"
                placeholder="Name"
                value={section.name}
                onChange={(event) =>
                  handleSectionNameChange(sectionIndex, event)
                }
              />
              {sections[sectionIndex].questions.map(
                (question, questionIndex) => {
                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() =>
                          removeQuestion(sectionIndex, questionIndex)
                        }
                      >
                        Remove Question
                      </button>
                      <input
                        name="text"
                        placeholder="Text"
                        value={question.text}
                        onChange={(event) =>
                          handleQuestionNameChange(
                            sectionIndex,
                            questionIndex,
                            event
                          )
                        }
                      />
                    </div>
                  );
                }
              )}
              <button onClick={() => addQuestion(sectionIndex)}>
                Add Question
              </button>
            </div>
          );
        })}
        <button onClick={() => addSection()}>Add Section</button>
      </form>
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default AddNewTestProfessor;
