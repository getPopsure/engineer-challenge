import React, { useContext } from "react";

import TableRow from "./TableRow";
import TableHead from "./TableHead";

import { Policy } from "../../types";
import { Context } from "../../context";

type TTable = React.HTMLAttributes<HTMLDivElement>;

const Table: React.FC<TTable> = () => {
  const { policies } = useContext(Context);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <TableHead />
              <tbody>
                {policies.map((policy: Policy) =>
                  <TableRow key={policy.id} policy={policy} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Table);