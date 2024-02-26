import { useState } from "react";

export const PageController = ({ basePage, onPageChange }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const isFirstPageIndex = pageIndex === 0;
  const isLastPageIndex = Math.ceil(basePage.totalPages / 10) <= pageIndex + 1;

  const pageListLength = isLastPageIndex
    ? basePage.totalPages - pageIndex * 10
    : 10;
  const pageList = Array.from(
    { length: pageListLength },
    (_, index) => index + 1
  );

  const handleClickLeftButton = () => {
    if (!isFirstPageIndex) {
      const newPageIndex = pageIndex - 1;
      onPageChange({ selected: pageIndex * 10 - 1 });
      setPageIndex(newPageIndex);
    }
  };

  const handleClickRightButton = () => {
    if (!isLastPageIndex) {
      const newPageIndex = pageIndex + 1;
      onPageChange({ selected: newPageIndex * 10 });
      setPageIndex(newPageIndex);
    }
  };

  const handleClickPageButton = (page) => {
    onPageChange({ selected: page + pageIndex * 10 - 1 });
  };

  return (
    <div className="page-controller-container">
      <div className="icon-container" onClick={handleClickLeftButton}>
        <LeftAngleBracketLineIcon
          fill={isFirstPageIndex ? "#BEC3CB" : "#000000"}
        />
      </div>
      {pageList.map((page) => {
        const isSelected = page + pageIndex * 10 - 1 === basePage.page;
        return (
          <div
            className={`page-button ${isSelected ? "selected" : ""}`}
            onClick={() => handleClickPageButton(page)}
            key={page}
          >
            {page + pageIndex * 10}
          </div>
        );
      })}
      <div className="icon-container" onClick={handleClickRightButton}>
        <RightAngleBracketLineIcon
          fill={isLastPageIndex ? "#BEC3CB" : "#000000"}
        />
      </div>
    </div>
  );
};
