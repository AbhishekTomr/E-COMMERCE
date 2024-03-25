"use client";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import "./logout.scss";

type Props = {};

const Logout = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const userLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("api/users/logout");
      if (response.status !== 200) {
        throw new Error("error in logging out");
      }
      toast.success("Logged Out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Error logging out");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="logout-wrapper">
      <Button onClick={userLogout} className="theme-btn submit-btn">
        {isLoading ? <Spinner /> : "Log Out"}
      </Button>
    </div>
  );
};

export default Logout;
