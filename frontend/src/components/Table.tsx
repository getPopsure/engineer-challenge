import { useEffect, useState } from "react";

import { getPolicies } from "../api";
import TableRow from "./TableRow";
import { Policy } from "../types";
import TableHead from "./TableHead";

const Table = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const response = getPolicies();
    setPolicies(response as Policy[]);
  }, []);


  return (
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
}

export default Table;