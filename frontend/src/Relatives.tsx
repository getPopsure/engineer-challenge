import { useState } from 'react';
import { Relative } from './App';

type RelativesProps = {
  relatives: Relative[];
};

const Relatives: React.FC<RelativesProps> = ({ relatives }) => {
  const [visible, setVisible] = useState<Boolean>(false);

  return (
    <>
      {!!relatives.length && (
        <div onClick={() => setVisible(!visible)}>
          {!visible ? (
            <h6>(Click to expand)</h6>
          ) : (
            <>
              <sup>(Click to Close)</sup>

              <ul>
                {relatives.map(({ firstName, lastName, id }) => (
                  <li key={id}>
                    {firstName} {lastName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Relatives;
