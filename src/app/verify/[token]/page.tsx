"use client";
import { Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import "./verify.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";

type Props = {
  params: { token: string };
};

function VerifyPage({ params }: Props) {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState<boolean>(true);
  const router = useRouter();
  console.log("token****", params.token);
  const getUserInfo = async () => {
    try {
      const response = await axios.get("/api/verify/user");
      console.log("response*****", response);
      const email = response.data.user.email;
      setEmail(email);
    } catch (err) {
      toast.error(
        "unable to fetch user information, redirecting back to signup!!"
      );
      // router.push("/signup");
    }
  };

  const changeVerificationCode = (event: any, key: number) => {
    const value = event.target.value;
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[key] = value;
    setVerificationCode(updatedVerificationCode);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    let disabled = false;
    verificationCode.forEach(
      (code: any) => {
        if (_.isEmpty(code)) disabled = true;
      },
      [true]
    );
    setDisableVerifyBtn(disabled);
  }, [verificationCode]);

  const verifyUser = async (event: any) => {
    event.stopPropagation();
    try {
      const token = verificationCode.join("");
      console.log("code!!!", token);
      const response = await axios.post("/api/verify/token", { email, token });
      const { success } = response.data;
      if (!success) throw new Error("invalid token!!!");
      toast.success("User Verifies");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("invalid code!!");
    }
  };
  return (
    <Card className="sign-up-wrap">
      <h2 className="signUp-header">Verify you email</h2>
      <div className="sub-heading">
        <span className="verify-subhead">
          Enter the 8 digit code you have received on{" "}
          {email.length ? email.slice(0, 3) + "****" + email.split("@")[1] : ""}
        </span>
      </div>
      <Form>
        <Form.Label htmlFor="code1">Code</Form.Label>
        <div className="form-control-wrap verification-code-wrap">
          <Form.Control
            type="text"
            id="code1"
            name="code1"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 0);
            }}
            value={verificationCode[0]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code2"
            name="code2"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 1);
            }}
            value={verificationCode[1]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code3"
            name="code3"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 2);
            }}
            value={verificationCode[2]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code4"
            name="code4"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 3);
            }}
            value={verificationCode[3]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code5"
            name="code5"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 4);
            }}
            value={verificationCode[4]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code6"
            name="code6"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 5);
            }}
            value={verificationCode[5]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code7"
            name="code7"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 6);
            }}
            value={verificationCode[6]}
            autoComplete="off"
          />
          <Form.Control
            type="text"
            id="code8"
            name="code8"
            maxLength={1}
            onChange={(event) => {
              changeVerificationCode(event, 7);
            }}
            value={verificationCode[7]}
            autoComplete="off"
          />
        </div>
        <Button
          className={`theme-btn submit-btn ${
            disableVerifyBtn ? "disabled" : ""
          }`}
          disabled={disableVerifyBtn ? true : false}
          onClick={verifyUser}
        >
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
