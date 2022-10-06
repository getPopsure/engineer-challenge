import React, { useContext, useMemo, useState } from "react";
import AnimateHeight from 'react-animate-height';

import CheckboxList from "../../CheckboxList";

import { Context } from "../../../context";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { FilterKeys, Policy } from "../../../types";
import slugify from "../../../utils/slugify";

import styles from "./FilterDropdown.module.scss";

import { ReactComponent as ChevronDown } from "../../../assets/chevron-down.svg";

type TFilterDropdown = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  filterKey: FilterKeys;
  label: string;
}

const FilterDropdown: React.FC<TFilterDropdown & IProps> = ({ filterKey, label }) => {
  const { policies } = useContext(Context);
  const [expanded, setExpanded] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setExpanded(false));

  const options: string[] = useMemo(() => {
    return Array.from(new Set(policies.map((policy: Policy) => policy[filterKey].toLowerCase())))
  }, [policies]);

  return (
    <div className={styles.filterDropdown} ref={ref}>
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
        id={slugify(label)}
        duration={300}
        height={expanded ? 'auto' : 0}
      >
        <CheckboxList filterKey="provider" values={options} />
      </AnimateHeight>
    </div>
  )
};


export default React.memo(FilterDropdown);
