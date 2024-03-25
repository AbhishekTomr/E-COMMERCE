"use client";
import React from "react";
import "./login.scss";
import { Form, Button, Card, Spinner } from "react-bootstrap";
// import { useUserContext } from "../context/userContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser as UserType } from "../context/userContext";

interface IUser {
  email: string;
  password: string;
}

type UserProps = "email" | "password";

type IResponse = any | { success: boolean; user: any };

const Login = () => {
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [disableLogin, setDisabledLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { updateUser } = useUserContext();

  const router = useRouter();

  const onDataChange = (key: UserProps, data: string) => {
    const updatedUser = { ...user };
    updatedUser[key] = data;
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
    try {
      setIsLoading(true);
      const response: IResponse = await axios.post("/api/users/login", user);

      const fetchedUser = {
        ...response.data.user,
        isLoggedIn: true,
      };
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
