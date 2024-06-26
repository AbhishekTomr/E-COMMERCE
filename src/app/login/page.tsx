"use client";
import React from "react";
import "./login.scss";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import toast from "react-hot-toast";
import validator from "validator";

interface IUser {
  email: string;
  password: string;
}

type UserProps = "email" | "password";

type IResponse = any | { success: boolean; user: any };
interface IError {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [disableLogin, setDisabledLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ email: "", password: "" });

  const router = useRouter();

  const validateForm = () => {
    let validForm = true;
    const { email, password } = user;
    if (!validator.isEmail(email) || !validator.trim(email).length) {
      setError((oldState) => ({
        ...oldState,
        email: "please enter a valid email",
      }));
      validForm = false;
    }
    if (validator.trim(password).length < 6) {
      setError((oldState) => ({
        ...oldState,
        password: "enter a password with min 6  characters",
      }));
      validForm = false;
    }
    return validForm;
  };

  const onDataChange = (key: UserProps, data: string) => {
    const updatedUser = { ...user };
    const updatedError = { ...error };
    updatedError[key] = "";
    updatedUser[key] = data;
    setError(updatedError);
    setUser(updatedUser);
  };

  useEffect(() => {
    if (_.isEmpty(user.email) || _.isEmpty(user.password)) {
      return setDisabledLogin(true);
    }
    setDisabledLogin(false);
  }, [user]);

  const userLogin = async (event: any) => {
    event.stopPropagation();
    const validForm = validateForm();
    if (!validForm) return;
    try {
      setIsLoading(true);
      validateForm();
      const response: IResponse = await axios.post("/api/users/login", user);
      toast.success("logged in successfully");
      router.push("/categories");
    } catch (err: any) {
      const errorText = JSON.parse(err.request.responseText)?.error;
      toast.error(errorText || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sign-up-wrap">
      <h2 className="signUp-header">Login</h2>
      <div className="sub-heading">
        <h3>Welcome back to ECOMMERCE</h3>
        <span>The next gen business marketplace</span>
      </div>
      <Form>
        <div className="form-control-wrap">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter"
            value={user.email}
            onChange={(event: any) => {
              onDataChange("email", event.target.value);
            }}
            isInvalid={!_.isEmpty(error.email)}
          />
          {!_.isEmpty(error.email) && (
            <span className="error">{error.email}</span>
          )}
        </div>
        <div className="form-control-wrap">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Enter"
            value={user.password}
            onChange={(event: any) => {
              onDataChange("password", event.target.value);
            }}
            isInvalid={!_.isEmpty(error.password)}
          />
          {!_.isEmpty(error.password) && (
            <span className="error">{error.password}</span>
          )}
        </div>
        <Button
          className={`theme-btn submit-btn ${disableLogin ? "disabled" : ""}`}
          disabled={disableLogin ? true : false}
          onClick={userLogin}
        >
          {isLoading ? <Spinner /> : "LOGIN"}
        </Button>
        <span className="alter-router-span">
          Need an Account? <Link href={"/signup"}>Sign Up</Link>
        </span>
      </Form>
    </Card>
  );
};

export default Login;
