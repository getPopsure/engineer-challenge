import classNames from "classnames";
import { FunctionComponent } from "react";

export type PagerProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
  activePage?: number;
};

const Pager: FunctionComponent<PagerProps> = ({
  totalPages,
  onPageChange,
  activePage,
}) => {
  return totalPages > 1 ? (
    <ul className="pages" style={{ marginLeft: "auto" }}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <li key={index}>
          <button
            onClick={() => onPageChange(index + 1)}
            className={classNames(
              "rounded-md",
              "border",
              "whitespace-nowrap",
              "justify-center",
              "font-medium",
              "button",
              activePage === index + 1 ? "bg-gray-600 text-white" : ""
            )}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  ) : null;
};

export { Pager };
