"use client";

// components/Signup.js
import React, { useEffect } from "react";
import "./signup.scss";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import _ from "lodash";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IUser {
  username: string;
  email: string;
  password: string;
}

type UserProps = "username" | "email" | "password";

const Signup = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });
  const [disableSignUp, setDisableSignUp] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onDataChange = (key: UserProps, data: string) => {
    const updatedUser = { ...user };
    updatedUser[key] = data;
    setUser(updatedUser);
  };

  useEffect(() => {
    if (
      _.isEmpty(user.username) ||
      _.isEmpty(user.email) ||
      _.isEmpty(user.password)
    ) {
      return setDisableSignUp(true);
    }
    setDisableSignUp(false);
  }, [user]);

  const userSignUp = async (event: any) => {
    event.stopPropagation();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status !== 200) {
        throw new Error("something went wrong");
      }
      toast.success("sign up successfully");
      router.push("/login");
    } catch (err: any) {
      const errorText = JSON.parse(err.request.responseText).error;
      toast.error(errorText || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sign-up-wrap">
      <h2 className="signUp-header">Create your account</h2>
      <Form>
        <div className="form-control-wrap">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="username"
            placeholder="Enter"
            value={user.username}
            onChange={(event: any) => {
              onDataChange("username", event.target.value);
            }}
          />
        </div>
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
          />
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
          />
        </div>
        <Button
          className={`theme-btn submit-btn ${disableSignUp ? "disabled" : ""}`}
          disabled={disableSignUp ? true : false}
          onClick={userSignUp}
        >
          {isLoading ? <Spinner /> : "CREATE ACCOUNT"}
        </Button>
        <span className="alter-router-span">
          Have an Account? <Link href={"/login"}>Login</Link>
        </span>
      </Form>
    </Card>
  );
};

export default Signup;
