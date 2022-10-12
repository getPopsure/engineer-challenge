import { FunctionComponent } from "react";
import Badge, { Status } from "../Badge";
import { TableBodyProps } from "../models/Table";

const TableBody: FunctionComponent<TableBodyProps> = ({ records }) => {
  return (
    <tbody>
      {records.map((record, index) => (
        <tr className="border-b" key={index} role="row">
          {record.cells.map((cell, index) => (
            <td
              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              key={index}
              role="cell"
            >
              {cell.name === "Status" ? (
                <Badge status={cell.value as Status} />
              ) : (
                cell.value
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export { TableBody };
