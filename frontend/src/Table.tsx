import React, { useEffect, useState } from "react";
import Badge from "./Badge";

const BASE_URL = "http://localhost:4000";

const Table = () => {
  useEffect(() => {
    // TODO: check pagination
    fetch(`${BASE_URL}/policies`).then((response) =>
      response.json().then((data) => {
        // TODO: this should be done with api param
        const dataToShow = data.filter((item: Policy) =>
          ["ACTIVE", "PENDING"].includes(item.status)
        );
        setData(dataToShow);
      })
    );
  }, []);
  const [data, setData] = useState<Policy[]>([]);

  if (!data.length) return <div>loading...</div>;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Provider
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {idx + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.customer.firstName} {item.customer.lastName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.provider}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {getTitleCase(item.insuranceType)}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <Badge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

const getTitleCase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
