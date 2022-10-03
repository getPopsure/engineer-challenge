import data from "../data"
import { Customer } from "../types"

export const getPolicies = () => {
  return data.map(item => {
    const customer: Customer = {
      id: item.customer.id,
      firstName: item.customer.firstName,
      lastName: item.customer.lastName,
      dateOfBirth: new Date(item.customer.dateOfBirth)
    }

    return {
      id: item.id,
      provider: item.provider,
      insuranceType: item.insuranceType,
      status: item.status,
      startDate: new Date(item.startDate),
      customer,
    }
  })
}