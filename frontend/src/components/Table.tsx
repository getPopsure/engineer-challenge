import React from "react";

import TableRow from "./TableRow";
import { Policy } from "../types";
import TableHead from "./TableHead";

type TTable = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  policies: Policy[];
}

const Table: React.FC<TTable & IProps> = ({ policies }) => (
  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg shadow-sm">
          <table className="min-w-full">
            <TableHead />
            <tbody>
              {policies.map(policy =>
                <TableRow key={policy.id} policy={policy} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

export default React.memo(Table);