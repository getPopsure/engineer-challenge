interface PaginationProps {
  totalPage: number;
  onPageClick: (page: number) => void;
}

const Pagination = ({ totalPage, onPageClick }: PaginationProps) => {
  // take total page number and create and array of page numbers
  const pageArr = Array.from(Array(totalPage).keys());
  return (
    <>
      {pageArr.map((el) => (
        <button key={el} className="mr-4" onClick={() => onPageClick(el + 1)}>
          {el + 1}
        </button>
      ))}
    </>
  );
};
export default Pagination;
