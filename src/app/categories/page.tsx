"use client";
import React from "react";
import { Card, Form } from "react-bootstrap";
import ListPagination from "../components/pagination";
import "./categories.scss";
import Logout from "../components/logout";

type Props = {};

const Categories = (props: Props) => {
  const interests = [
    "shoes",
    "Men T-shirts",
    "Makeup",
    "Jewellery",
    "Women T-shirts",
    "Furniture",
  ];
  return (
    <>
      <Logout />
      <Card className="sign-up-wrap">
        <h2 className="signUp-header"> Please mark your interests!</h2>
        <div className="sub-heading">
          <span>We will keep you notified.</span>
        </div>
        <div className="category-wrap">
          <h6>My saved interests!</h6>
          {interests.map((interests, index) => {
            return (
              <Form.Check
                key={index}
                label={interests}
                className="category-checkbox"
              />
            );
          })}
        </div>
        <ListPagination />
      </Card>
    </>
  );
};

export default Categories;
