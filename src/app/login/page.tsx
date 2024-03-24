"use client";
import React from "react";
import "./login.scss";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

const Login = () => {
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
          />
        </div>
        <div className="form-control-wrap">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Enter"
          />
        </div>
        <Button type="submit" className="theme-btn submit-btn">
          LOGIN
        </Button>
        <span className="alter-router-span">
          Have an Account? <Link href={"/signup"}>Login</Link>
        </span>
      </Form>
    </Card>
  );
};

export default Login;
