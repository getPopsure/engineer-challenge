import { Customer } from "../types";

const getCustomerName = (customer: Customer): string => {
  return `${customer.firstName} ${customer.lastName}`;
}
export default getCustomerName;