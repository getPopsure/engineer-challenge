import React, { useState } from "react";
import AnimateHeight from 'react-animate-height';

import CheckboxList from "./CheckboxList";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import slugify from "../../../utils/slugify";

import styles from "./FilterDropdown.module.scss";

import { ReactComponent as ChevronDown } from "../../../assets/chevron-down.svg";

type TFilterDropdown = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  filterKey: "provider" | "insuranceType" | "status";
  label: string;
  options: { label: string; value: string; }[];
}

const FilterDropdown: React.FC<TFilterDropdown & IProps> = ({ filterKey, label, options }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setExpanded(false));

  return (
    <div
      className={styles.filterDropdown}
      data-testid={`filter-dropdown-${filterKey}`}
      ref={ref}>
      <button
        aria-expanded={expanded}
        aria-controls={slugify(label)}
        className={styles.button}
        onClick={() => setExpanded(exp => !exp)}
      >
        <span className={expanded ? '' : '-rotate-90'}>
          <ChevronDown />
        </span>
        {label}
      </button>
      <AnimateHeight
        className={styles.dropdown}
        contentClassName={styles.dropdownContent}
        data-testid="filter-dropdown-options"
        id={slugify(label)}
        duration={300}
        height={expanded ? 'auto' : 0}
      >
        <CheckboxList filterKey={filterKey} options={options} />
      </AnimateHeight>
    </div>
  )
};


export default React.memo(FilterDropdown);
