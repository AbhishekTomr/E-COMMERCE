"use client";
import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import "./verify.scss";

type Props = {};

function VerifyPage({}: Props) {
  return (
    <Card className="sign-up-wrap">
      <h2 className="signUp-header">Verify you email</h2>
      <div className="sub-heading">
        <span className="verify-subhead">
          Enter the 8 digit code you have received on anu***@gmail.com
        </span>
      </div>
      <Form>
        <Form.Label htmlFor="code1">Code</Form.Label>
        <div className="form-control-wrap verification-code-wrap">
          <Form.Control type="text" id="code1" name="code1" maxLength={1} />
          <Form.Control type="text" id="code2" name="code1" maxLength={1} />
          <Form.Control type="text" id="code3" name="code1" maxLength={1} />
          <Form.Control type="text" id="code4" name="code1" maxLength={1} />
          <Form.Control type="text" id="code5" name="code1" maxLength={1} />
          <Form.Control type="text" id="code6" name="code1" maxLength={1} />
          <Form.Control type="text" id="code7" name="code1" maxLength={1} />
          <Form.Control type="text" id="code8" name="code1" maxLength={1} />
        </div>
        <Button type="submit" className="theme-btn submit-btn">
          Verify
        </Button>
        <span className="alter-router-span">
          Have an Account? <Link href={"/login"}>Login</Link>
        </span>
      </Form>
    </Card>
  );
}

export default VerifyPage;
