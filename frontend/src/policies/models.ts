
// <tr className="border-b">
// <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
// <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//   Cyrillus Biddlecombe
// </td>
// <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//   BARMER
// </td>
// <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//   Health
// </td>
// <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//   <Badge status="ACTIVE" />
// </td>
// </tr>

import { InsuranceType } from "../models";

type Policy = [
    name: String,
    provider: String,
    insuranceType: InsuranceType,
    status: JSX.Element,
    dependants: JSX.Element
]


export type {
    Policy
}