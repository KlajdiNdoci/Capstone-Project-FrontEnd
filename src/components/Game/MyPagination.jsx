import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const MyPagination = ({ dispatch, data, pageNumber, selectedGenre }) => {
  const [currentPage, setCurrentPage] = useState(data.number - 1);

  const handlePageChange = pageNumber => {
    if (pageNumber !== currentPage) {
      dispatch(pageNumber);
    }
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [pageNumber, selectedGenre]);

  let items = [];

  if (data.totalPages <= 10) {
    for (let number = 0; number < data.totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number + 1}
        </Pagination.Item>
      );
    }
  } else {
    const startPage = Math.max(currentPage - 2, 0);
    const endPage = Math.min(startPage + 5, data.totalPages - 1);

    if (startPage > 0) {
      items.push(
        <Pagination.Item key={0} onClick={() => handlePageChange(0)}>
          {1}
        </Pagination.Item>
      );
      items.push(<Pagination.Ellipsis key="startEllipsis" />);
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number + 1}
        </Pagination.Item>
      );
    }

    if (endPage < data.totalPages - 1) {
      items.push(<Pagination.Ellipsis key="endEllipsis" />);
      items.push(
        <Pagination.Item key={data.totalPages - 1} onClick={() => handlePageChange(data.totalPages - 1)}>
          {data.totalPages}
        </Pagination.Item>
      );
    }
  }

  return (
    <>
      {data && (
        <div className="d-flex justify-content-center mt-auto">
          <Pagination>{items}</Pagination>
        </div>
      )}
    </>
  );
};

export default MyPagination;
