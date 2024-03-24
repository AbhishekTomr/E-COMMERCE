"use client";

import { Pagination } from "react-bootstrap";
import "./pagination.scss";
import { useEffect, useState } from "react";
import _ from "lodash";

interface ListPaginationProps {}

const ListPagination = (props: ListPaginationProps) => {
  const [activePage, setActivePage] = useState(4);
  const [pageList, setPageList] = useState([1, 2, 3, 4, 5, 6, 7]);
  useEffect(() => {
    let newList = [...pageList];
    if (pageList[0] === activePage && activePage !== 1) {
      newList = newList.map((item) => item - 1);
    }
    if (pageList.pop() === activePage && activePage !== 100) {
      newList = newList.map((item) => item + 1);
    }
    setPageList(newList);
  }, [activePage]);
  return (
    <div>
      <Pagination>
        <Pagination.First className="page-btn" />
        <Pagination.Prev className="page-btn" />
        {pageList.map((page, index) => {
          return (
            <Pagination.Item
              onClick={(event: any) =>
                setActivePage(_.toNumber(event.target.textContent))
              }
              active={page == activePage}
              key={index}
              className={`page-btn ${page == activePage ? " active-page" : ""}`}
            >
              {page}
            </Pagination.Item>
          );
        })}
        <Pagination.Next className="page-btn" />
        <Pagination.Last className="page-btn" />
      </Pagination>
    </div>
  );
};

export default ListPagination;
