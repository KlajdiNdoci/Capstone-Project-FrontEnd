import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const MyPagination = ({ dispatch, gamesData }) => {
  const [currentPage, setCurrentPage] = useState(gamesData.number - 1);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    dispatch(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, []);

  let items = [];
  for (let number = 0; number <= gamesData.totalPages - 1; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <>
      {gamesData && (
        <div className="d-flex justify-content-center mt-auto">
          <Pagination>{items}</Pagination>
        </div>
      )}
    </>
  );
};

export default MyPagination;
