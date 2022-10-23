import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/constants";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: undefined,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email, userType } = values;
      console.table(password, confirmPassword, username, email, userType);
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        userType,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  //   useEffect(() => {
  //     if (localStorage.getItem("chat-app-user")) {
  //       navigate("/");
  //     }
  //   }, []);

  const handleValidation = () => {
    const { password, confirmPassword, username, email, userType } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password and confirm passowrd should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater that 3 characters", toastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error(
        "Password should be equal or greater then 3 characters",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (userType === undefined) {
      toast.error("Select user type e.g. Professor", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>SOTIS</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            autoComplete="on"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Configm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            autoComplete="on"
          />

          <fieldset>
            <div>
              <input
                type="radio"
                id="professor"
                name="userType"
                value="Professor"
                onChange={(e) => handleChange(e)}
                autoComplete="on"
              />
              <label htmlFor="professor">Professor</label>
              <input
                type="radio"
                id="admin"
                name="userType"
                value="Admin"
                onChange={(e) => handleChange(e)}
                autoComplete="on"
              />
              <label htmlFor="admin">Administrator</label>
              <input
                type="radio"
                id="student"
                name="userType"
                value="Student"
                onChange={(e) => handleChange(e)}
                autoComplete="on"
              />
              <label htmlFor="student">Student</label>
            </div>
          </fieldset>

          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 75vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-left: 20rem;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
  fieldset {
    div {
      display: flex;
      color: white;
      flex-direction: row;
      label {
        padding: 0.5rem;
      }
    }
  }
`;

export default Register;
