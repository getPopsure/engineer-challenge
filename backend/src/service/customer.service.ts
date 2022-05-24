import {Customer, Prisma} from "@prisma/client"
import {Context} from "../global/context"

export type CreateCustomerRequest = Omit<Prisma.CustomerCreateInput, "id" | "policies">

export class CustomerService {
  private _context: Context

  constructor(context: Context) {
    this._context = context
  }

  public createCustomer = async (customer: CreateCustomerRequest): Promise<Customer> => {
    return await this._context.prisma.customer.create({
      data: {
        ...customer
      }
    })
  }
}
