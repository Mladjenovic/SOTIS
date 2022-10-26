import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/constants";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      var { headers, status } = await axios
        .post(loginRoute, {
          username,
          password,
        })
        .catch((error) => {
          toast.error(error.message, toastOptions);
        });

      var decoded_token = jwt_decode(headers["access-token"]);
      const current_user = decoded_token["session-info"];

      if (status !== 200) {
        toast.error("Error occured", toastOptions);
      }
      if (status === 200) {
        localStorage.setItem("sotis-app-user", current_user);
        toast.success("Successfull log in", toastOptions);
        setTimeout(() => {
          navigate(0);
          navigate("/");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sotis-app-user")) {
      navigate("/");
      navigate(0);
    }
  }, []);

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Username and password are required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username and password are required", toastOptions);
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
            min="3"
            autoComplete="on"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            autoComplete="on"
          />

          <button type="submit">Login</button>
          <span>
            Don&apos;t have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 70vh;
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
`;

export default Login;
