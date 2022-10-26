import ComboBox from "../ComboBox";

type TableFooterProps = {
  initialValue: number;
  currentPageNumber: number;
  totalPages: number;
  totalRows: number;
  initialRowNumber: number;
  finalRowNumber: number;
  onClickPage: (page: number) => void;
  onClickPageSize: (pageSize: number) => void;
};
const TableFooter = (props: TableFooterProps) => {
  const PAGES_RANGE = ["5", "10", "15", "30"];

  return (
    <div className="flex justify-center min-w-full w-full mx-auto text-sm text-gray-900 font-light relative my-2">
      <span className="mr-5 absolute left-2 bottom-0">
        <ComboBox
          onSearchSubmit={(option) => props.onClickPageSize(Number(option))}
          options={PAGES_RANGE}
          placeholderText="Page size"
          labelText="Page size"
          initialValue={props.initialValue}
        />
      </span>
      <ul className="inline-flex">
        {Array.from(Array(props.totalPages)).map((_, index) => (
          <li key={`${index}-page`}>
            <button
              onClick={() => props.onClickPage(index + 1)}
              className={`${
                props.currentPageNumber === index + 1
                  ? "bg-gray-300"
                  : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              } py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 `}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <span className="mr-5 absolute right-2 bottom-0">
        Showing {props.initialRowNumber} to {props.finalRowNumber} of{" "}
        {props.totalRows} elements
      </span>
    </div>
  );
};

export default TableFooter;
