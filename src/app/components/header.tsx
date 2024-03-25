import React from "react";
import Image from "next/image";
import leftArrow from "../../../public/assets/leftHalfArrow.svg";
import rightArrow from "../../../public/assets/rightHalfArrow.svg";
import searchIcon from "../../../public/assets/search.svg";
import shopIcon from "../../../public/assets/shop.svg";

import "./header.scss";
import Logout from "./logout";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className={"header-wrap"}>
      <div className="pre-header-wrap">
        <div className="quick-links-wrap">
          <span>
            <a href="#">Help</a>
          </span>
          <span>
            <a href="#">Order & Return</a>
          </span>
          <span>
            <a href="#">Hi, John</a>
          </span>
        </div>
      </div>
      <header>
        <h1 className="company-title">ECOMMERCE</h1>
        <div className="nav-bar">
          <span>
            <a href="#">Category</a>
          </span>
          <span>
            <a href="#">Sale</a>
          </span>
          <span>
            <a href="#">Clearance</a>
          </span>
          <span>
            <a href="#">New Stock</a>
          </span>
          <span>
            <a href="#">Trending</a>
          </span>
        </div>
        <div className="logo-wrap">
          <button>
            <Image src={searchIcon} alt="search icon" />
          </button>
          <button>
            <Image src={shopIcon} alt="shop-icon" />
          </button>
        </div>
      </header>
      <div className="post-header-wrap">
        <button className="transparent-btn">
          <Image src={leftArrow} alt="to left" />
        </button>
        Get 10% off on bussiness sign up
        <button className="transparent-btn">
          <Image src={rightArrow} alt="to  right" />
        </button>
      </div>
    </div>
  );
};

export default Header;
