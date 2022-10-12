import React, { useContext } from "react"

import { Context } from "../../context";

import styles from "./Pagination.module.scss";

type TPaginationButton = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  index: number;
  disabled: boolean;
}

const PaginationButton: React.FC<IProps & TPaginationButton> = ({ index, disabled }) => {
  const { setPage } = useContext(Context);

  const goToPage = () => {
    setPage(index);
  }

  return (
    <button
      className={styles.button}
      data-testid="paginationButton"
      disabled={disabled}
      onClick={goToPage}>
      {index + 1}
    </button>
  )

}

export default React.memo(PaginationButton);