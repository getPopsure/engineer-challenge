import {Policy, PolicyChangeType, Prisma} from "@prisma/client"
import {applicationLogger} from "../middlewares/logger.middleware"
import {Context} from "../global/context"
import {Nullable, objWithoutUndefinedFields} from "../util/util"
import {getContext} from "../db/prisma.client"
import {InvalidEntityException, NotFoundException} from "../exceptions"

export type Pager = {
  skip?: number,
  take?: number
}

export type CreatePolicy = Omit<Policy, "id" | "createdAt" | "customer">
export type UpdatePolicy = Nullable<Omit<Policy, "id" | "customer" | "createdAt">>

export type CreatePolicyRequest = {
  policy: CreatePolicy
}

export type SearchPolicyRequest = {
  query?: string,
  field?: string,
  pager?: Pager
}

export type UpdatePolicyRequest = {
  id: string,
  policy: UpdatePolicy
}

export type DeletePolicyRequest = {
  id: string
}

export type GetPolicyHistoryRequest = {
  policyId: string
}

export class PoliciesService {
  private _context: Context

  constructor(context: Context = getContext()) {
    this._context = context
  }

  public _parseWhereInput = (search: SearchPolicyRequest): Prisma.PolicyWhereInput => {
    return search.query
      ? {
        OR: [
          {provider: {contains: search.query, mode: "insensitive"}},
          {customer: {firstName: {contains: search.query, mode: "insensitive"}}},
          {customer: {lastName: {contains: search.query, mode: "insensitive"}}}
        ]
      }
      : {}
  }

  public createPolicy = async (policyRequest: CreatePolicyRequest): Promise<Policy> => {
    applicationLogger.info("Creating policy for input", policyRequest)
    return await this._context.prisma.$transaction(async (tx) => {
      const customer = await tx.customer.findUnique({
        where: {id: policyRequest.policy.customerId},
        select: {
          id: true
        }
      })
      if (!customer) {
        throw new NotFoundException("Customer with id " + policyRequest.policy.customerId + " not found")
      }
      return await tx.policy.create({
        data: {
          endDate: policyRequest.policy.endDate,
          startDate: policyRequest.policy.startDate,
          status: policyRequest.policy.status,
          provider: policyRequest.policy.provider,
          insuranceType: policyRequest.policy.insuranceType,
          customer: {
            connect: {
              id: customer.id
            }
          }
        }
      })
    })
  }

  public deletePolicy = async (deleteRequest: DeletePolicyRequest): Promise<Policy> => {
    applicationLogger.debug("Deleting policies for input", deleteRequest)
    const policyId = deleteRequest.id
    return await this._context.prisma.$transaction(async (tx) => {
      const existingPolicy = await tx.policy.findUnique({
        where: {
          id: policyId
        }
      })
      applicationLogger.debug("Updating policy value", existingPolicy)
      if (!existingPolicy) {
        throw new NotFoundException("Policy with id " + policyId + " not found")
      }
      await this.createPolicyHistory(existingPolicy, PolicyChangeType.DELETE, tx)
      return await tx.policy.delete({
        where: {
          id: policyId
        },
      })
    })
  }

  public updatePolicy = async (updateRequest: UpdatePolicyRequest): Promise<Policy> => {
    applicationLogger.debug("Updating policies for input", updateRequest)
    return await this._context.prisma.$transaction(async (tx) => {
      const existingPolicy = await tx.policy.findUnique({
        where: {
          id: updateRequest.id
        }
      })
      applicationLogger.debug("Updating policy value", existingPolicy)
      if (!existingPolicy) {
        throw new NotFoundException("Policy with id " + updateRequest.id + " not found")
      }
      await this.createPolicyHistory(existingPolicy, PolicyChangeType.UPDATE, tx)
      return await tx.policy.update({
        where: {
          id: updateRequest.id
        },
        data: {...objWithoutUndefinedFields(updateRequest.policy)}
      })
    })
  }

  public searchPolicies = async (search: SearchPolicyRequest = {}): Promise<Omit<Policy, "customerId">[]> => {
    applicationLogger.debug("Searching policies for input", search)
    const query = this._parseWhereInput(search);
    return await this._context.prisma.policy.findMany({
      skip: search?.pager?.skip,
      take: search?.pager?.take,
      where: {
        ...query
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true
          }
        }
      }
    })
  }

  public createPolicyHistory = async (policy: Policy, policyChangeType: PolicyChangeType, prisma: Prisma.TransactionClient) => {
    applicationLogger.debug("Creating  policy history for input", policy, policyChangeType)
    return await prisma.policyHistory.create({
      data: {
        endDate: policy.endDate,
        startDate: policy.startDate,
        policyId: policy.id,
        provider: policy.provider,
        insuranceType: policy.insuranceType,
        status: policy.status,
        customerId: policy.customerId,
        policyCreatedAt: policy.createdAt,
        policyChangeType: policyChangeType
      }
    })
  }

  public getPolicyHistory = async (getRequest: GetPolicyHistoryRequest) => {
    applicationLogger.debug("Getting  policy histories for input", getRequest)
    return await this._context.prisma.policyHistory.findMany({
      where: {
        policyId: getRequest.policyId
      },
      select: {
        id: true,
        provider: true,
        customerId: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        policyId: true,
        policyChangeType: true,
        policyCreatedAt: true
      }
    })
  }
}

export class PoliciesValidator {
  private static UUID_REGEXP: RegExp = new RegExp("^[\\da-f]{8}-[\\da-f]{4}-[1-5][\\da-f]{3}-[89ab][\\da-f]{3}-[\\da-f]{12}$")


  /**
   * @throws(InvalidEntityException)
   * @param date
   * @param fieldName
   */
  public static validateDate(date: any, fieldName: string) {
    if (!(date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date))) {
      throw new InvalidEntityException(fieldName + " should be a date, but got " + date + " instead")
    }
  }

  /**
   * @throws(InvalidEntityException)
   * @param str
   * @param fieldName
   */
  public static validateString(str: any, fieldName: string) {
    if (!(typeof str === 'string' || str instanceof String)) {
      throw new InvalidEntityException(fieldName + " should be a correct string, but got " + str + " instead")
    }
  }

  /**
   * @throws(InvalidEntityException)
   * @param policy
   */
  public static validateUpdatePolicy(policy: UpdatePolicy) {
    if (policy.endDate !== null) {
      this.validateDate(policy.endDate, "endDate")
    }
    if (policy.startDate !== null) {
      this.validateDate(policy.startDate, "startDate")
    }
    if (policy.status !== null) {
      this.validateString(policy.status, "status")
    }
    if (policy.insuranceType !== null) {
      this.validateString(policy.insuranceType, "insuranceType")
    }
    if (policy.customerId !== null) {
      this.validateUuid(policy.customerId, "customerId")
    }
    if (policy.provider !== null) {
      this.validateString(policy.provider, "provider")
    }
  }

  /**
   * @throws(InvalidEntityException)
   * @param policy
   */
  public static validateCreatePolicy(policy: CreatePolicy) {
    if (policy.endDate) {
      this.validateDate(policy.endDate, "endDate")
    }
    this.validateDate(policy.startDate, "startDate")
    this.validateString(policy.status, "status")
    this.validateString(policy.insuranceType, "insuranceType")
    if (!policy.customerId) {
      throw new InvalidEntityException("customerId should be present")
    } else {
      this.validateUuid(policy.customerId, "customerId")
    }
    this.validateString(policy.provider, "provider")
  }

  /**
   * @throws(InvalidEntityException)
   * @param updatePolicyRequest
   */
  public static validateUpdatePolicyRequest(updatePolicyRequest: UpdatePolicyRequest) {
    this.validateUuid(updatePolicyRequest.id, "id")
    this.validateUpdatePolicy(updatePolicyRequest.policy)
  }

  /**
   * @throws(InvalidEntityException)
   * @param createPolicyRequest
   */
  public static validateCreatePolicyRequest(createPolicyRequest: CreatePolicyRequest) {
    this.validateCreatePolicy(createPolicyRequest.policy)
  }

  /**
   * @throws(InvalidEntityException)
   * @param deletePolicyRequest
   */
  public static validateDeletePolicyRequest(deletePolicyRequest: DeletePolicyRequest) {
    this.validateUuid(deletePolicyRequest.id, "id")
  }

  /**
   * @throws(InvalidEntityException)
   * @param getPolicyHistoryRequest
   */
  public static validateGetPolicyHistoryRequest(getPolicyHistoryRequest: GetPolicyHistoryRequest) {
    this.validateUuid(getPolicyHistoryRequest.policyId, "policyId")
  }

  /**
   * @throws(InvalidEntityException)
   * @param id
   * @param fieldName
   */
  public static validateUuid(id: any, fieldName: string) {
    this.validateString(id, fieldName)
    if (!PoliciesValidator.UUID_REGEXP.test(id)) {
      throw new InvalidEntityException(fieldName + " should be a correct uuid, but got " + id + " instead")
    }
  }
}
