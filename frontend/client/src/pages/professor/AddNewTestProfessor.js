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

  const [inputFields, setInputFields] = useState([{ name: "", age: "" }]);
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = () => {
    let newfield = { name: "", age: "" };

    setInputFields([...inputFields, newfield]);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="age"
                placeholder="Age"
                value={input.age}
                onChange={(event) => handleFormChange(index, event)}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default AddNewTestProfessor;
