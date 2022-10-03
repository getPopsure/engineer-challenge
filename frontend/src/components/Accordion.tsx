import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import slugify from '../utils/slugify';

import { ReactComponent as ChevronDown } from "../assets/chevron-down.svg";

type TAccordion = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  title: string;
}

const Accordion: React.FC<IProps & TAccordion> = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='py-2'>
      <button
        aria-expanded={expanded}
        aria-controls={slugify(title)}
        className="flex items-center font-bold px-4"
        onClick={() => setExpanded(exp => !exp)}
      >
        <span className={`mr-2 transform ${expanded ? '' : '-rotate-90'}`}>
          <ChevronDown className='w-2' />
        </span>
        {title}
      </button>

      <AnimateHeight
        contentClassName='bg-grey-200 p-4'
        id={slugify(title)}
        duration={500}
        height={expanded ? 'auto' : 0}
      >
        {children}
      </AnimateHeight>
    </div>
  );
};

export default Accordion