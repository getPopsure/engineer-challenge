import data from "../data"
import { Customer, Status } from "../types"

const status: Record<string, Status> = {
  "ACTIVE": Status.ACTIVE,
  "PENDING": Status.PENDING,
  "CANCELLED": Status.CANCELLED,
  "DROPPED_OUT": Status.DROPPED_OUT,
}


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
      status: status[item.status] as Status,
      startDate: new Date(item.startDate),
      customer,
    }
  })
}