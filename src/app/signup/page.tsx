"use client";

// components/Signup.js
import React from "react";
import "./signup.scss";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

const Signup = () => {
  return (
    <Card className="sign-up-wrap">
      <h2 className="signUp-header">Create your account</h2>
      <Form>
        <div className="form-control-wrap">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control type="text" id="name" name="name" placeholder="Enter" />
        </div>
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
          CREATE ACCOUNT
        </Button>
        <span className="alter-router-span">
          Have an Account? <Link href={"/login"}>Login</Link>
        </span>
      </Form>
    </Card>
  );
};

export default Signup;
