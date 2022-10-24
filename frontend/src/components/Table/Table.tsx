import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useAppContext } from "../../context/apiContext";
import { TPolicy } from "../../types";
import { useState } from "react";
import { Pagination } from "../Pagination";

export const Table = () => {
  const { state: { policies } } = useAppContext()
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const paginatedPolicies = policies.slice(firstIndex, lastIndex);
  const pages = Math.ceil(policies.length / recordsPerPage)

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <table className="min-w-full">
                <TableHead />
                <tbody>
                {paginatedPolicies.length > 0 ? (
                  paginatedPolicies.map((policy: TPolicy) =>
                      <TableRow key={policy.id} policy={policy} />
                    )
                ) : <tr><td>There are no policies matching the criteria !</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}