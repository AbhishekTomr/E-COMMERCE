"use client";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import ListPagination from "../components/pagination";
import "./categories.scss";
import Logout from "../components/logout";
import axios from "axios";
import toast from "react-hot-toast";
import _ from "lodash";

type Props = {};

const Categories = (props: Props) => {
  const [interests, setInterest] = useState<any[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(7);
  const [selectedInterest, setSelectedInterest] = useState<any[]>([]);

  const getAllInterests = async () => {
    try {
      const body = { pageNumber: activePage, pageSize: 5 };
      const response = await axios.post("/api/categories", body);
      const { products } = response.data;
      setInterest(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserInterests = async () => {
    try {
      const response = await axios.get("/api/users/interests");
      const { interests } = response.data;
      setSelectedInterest(interests);
    } catch (err) {
      console.error(err);
    }
  };

  const setUserInterests = async () => {
    try {
      if (_.isEmpty(selectedInterest)) return;
      const response = await axios.post("/api/users/interests", {
        selectedCategories: selectedInterest,
      });
      if (response.status !== 200) {
        throw new Error("error in updating interests");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onCheckToggle = (event: any, interestItem: any) => {
    const checked = event.target.checked;
    if (checked) {
      onChecked(interestItem);
    } else {
      onUnchecked(interestItem);
    }
  };

  const onChecked = (interestItem: any) => {
    const updatedInterest = [...selectedInterest];
    updatedInterest.push(interestItem);
    setSelectedInterest(updatedInterest);
  };

  const onUnchecked = (interestItem: any) => {
    const filteredInterest = selectedInterest.filter(
      (item: any) => item.productId !== interestItem.productId
    );
    setSelectedInterest(filteredInterest);
  };

  useEffect(() => {
    getAllInterests();
  }, [activePage]);

  useEffect(() => {
    getUserInterests();
  }, []);

  useEffect(() => {
    setUserInterests();
  }, [selectedInterest]);

  useEffect(() => {
    console.log("selected interests", selectedInterest);
  }, [selectedInterest]);

  const isChecked = (interest: any) => {
    if (_.isEmpty(interest) || _.isEmpty(selectedInterest)) return false;
    const item = selectedInterest?.find((item: any) => {
      return item.productId === interest.productId;
    });
    if (_.isEmpty(item)) {
      return false;
    } else {
      return true;
    }
  };

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
          {interests.map((interest, index) => {
            return (
              <Form.Check
                key={interest.productId}
                label={interest.productName}
                className="category-checkbox"
                onChange={(event: any) => {
                  onCheckToggle(event, interest);
                }}
                checked={isChecked(interest)}
              />
            );
          })}
        </div>
        <ListPagination activePage={activePage} setActivePage={setActivePage} />
      </Card>
    </>
  );
};

export default Categories;
