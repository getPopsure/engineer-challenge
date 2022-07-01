import Badge from "./Badge";
import {TablePagination} from '@material-ui/core';
import { useState } from "react";
import "./index.css";

interface TableProps {
  tableData: Policy[];
  hasError: boolean; 
  isLoading : boolean;
}

const Headers = ["#", "Name", "Provider", "Type", "Status"];

const Table = ({ tableData, isLoading, hasError }: TableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (isLoading) return (
    <div className="wrapper">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  )

  if (hasError) return (
    <div className="w-full m-8 text-center items-center">
      Oops! Something went wrong.
    </div>
  );
  if (!tableData.length) return (
    <div className="w-full m-8 text-center items-center">
      Sorry! We can't find any results that match your search
    </div> 
  );

  return (
    <div className="flex flex-col">
      <div className=" sm:-mx-6 lg:-mx-8 overflow-x-auto ">
        <div className="py-2 sm:px-6 lg:px-8 inline-block min-w-full ">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table role="table" className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  {Headers.map((header , index) => (
                  <th key={index} scope="col" role="columnheader" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    {header}
                  </th>
              ))}
                </tr>
              </thead>
              <tbody>
              {tableData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((item:any, index:number) =>  (
                <tr key={index} role="row" className="border-b">
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" role="cell">{index+1}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" role="cell">{item.customer.firstName} {item.customer.lastName}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" role="cell">{item.provider}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" role="cell">{(item.insuranceType)}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" role="cell"> <Badge status={item.status} /></td> 
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: 'Show all', value: tableData.length },
        ]}
        component="div"
        SelectProps={{
          inputProps: { 'aria-label': 'items' },
          native: true,
        }}
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Table;

