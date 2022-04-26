interface PaginationProps {
  page: number;
  onPageClick: (page: number) => void;
}

const Pagination = ({ page, onPageClick }: PaginationProps) => {
  // TODO: make page number dynamic
  // take the page number
  // create an array that starts from 0 and increment
  const pageArr = Array.from(Array(10).keys());
  const handleClick = (idx: number) => {
    onPageClick(idx + 1);
  };
  return (
    <>
      {pageArr.map((el) => (
        <button key={el} className="mr-4" onClick={() => handleClick(el)}>
          {el + 1}
        </button>
      ))}
    </>
  );
};
export default Pagination;
