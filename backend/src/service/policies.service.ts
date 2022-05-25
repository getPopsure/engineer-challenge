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

export type CreatePolicy = Omit<Policy, "id" | "createdAt" | "customer" | "deleted">
export type UpdatePolicy = Nullable<Omit<Policy, "id" | "customer" | "createdAt" | "deleted">>
export type PolicyDto = Omit<Policy, "customer" | "deleted">
export type FamilyMember = {
  firstName: string,
  lastName: string
}
export type FamilyMembers = Array<FamilyMember>

export type CreatePolicyRequest = {
  policy: CreatePolicy
}

export type SearchPolicyRequest = {
  query?: string,
  familyMember?: FamilyMember
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

  public static _parseQuery = (search: SearchPolicyRequest): Prisma.PolicyWhereInput => {
    const query = search.query
      ? {
        OR: [
          {provider: {contains: search.query, mode: "insensitive"}},
          {customer: {firstName: {contains: search.query, mode: "insensitive"}}},
          {customer: {lastName: {contains: search.query, mode: "insensitive"}}}
        ],
        AND: [{deleted: {equals: false}}]
      } : {
        AND: [{deleted: {equals: false}}]
      }
    if (search.familyMember) {
      if (!query.OR) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query.OR = []
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.OR.push(PoliciesService._familyMemberContains({firstName: "Eva", lastName: "Smith"}))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.OR.push({policyHistories: {some: PoliciesService._familyMemberContains({firstName: "Eva", lastName: "Smith"})}})
    }
    return query as Prisma.PolicyWhereInput
  }

  private static _familyMemberContains = (familyMember?: FamilyMember) => {
    return {familyMembers: {array_contains: [familyMember]}}
  }

  private static familyMembersAsInput(familyMembers: FamilyMembers | Prisma.JsonValue | null | undefined): Prisma.InputJsonObject | "DbNull" | undefined {
    if (familyMembers === null) {
      return Prisma.DbNull
    }
    if (familyMembers === undefined) {
      return undefined
    } else {
      return familyMembers as unknown as Prisma.InputJsonObject
    }
  }

  public createPolicy = async (policyRequest: CreatePolicyRequest): Promise<PolicyDto> => {
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
          deleted: false,
          familyMembers: PoliciesService.familyMembersAsInput(policyRequest.policy.familyMembers),
          customer: {
            connect: {
              id: customer.id
            }
          }
        }
      })
    })
  }

  public deletePolicy = async (deleteRequest: DeletePolicyRequest): Promise<PolicyDto> => {
    applicationLogger.debug("Deleting policies for input", deleteRequest)
    const policyId = deleteRequest.id
    return await this._context.prisma.$transaction(async (tx) => {
      const existingPolicy = await tx.policy.findUnique({
        where: {
          id: policyId
        }
      })
      applicationLogger.debug("Updating policy value", existingPolicy)
      if (!existingPolicy || existingPolicy.deleted) {
        throw new NotFoundException("Policy with id " + policyId + " not found")
      }
      await this.createPolicyHistory(existingPolicy, PolicyChangeType.DELETE, tx)
      return await tx.policy.update({
        where: {
          id: policyId
        }, data: {
          deleted: true
        },
      })
    })
  }

  public updatePolicy = async (updateRequest: UpdatePolicyRequest): Promise<PolicyDto> => {
    applicationLogger.debug("Updating policies for input", updateRequest)
    return await this._context.prisma.$transaction(async (tx) => {
      const existingPolicy = await tx.policy.findUnique({
        where: {
          id: updateRequest.id
        }
      })
      applicationLogger.debug("Updating policy value", existingPolicy)
      if (!existingPolicy || existingPolicy.deleted) {
        throw new NotFoundException("Policy with id " + updateRequest.id + " not found")
      }
      await this.createPolicyHistory(existingPolicy, PolicyChangeType.UPDATE, tx)
      return await tx.policy.update({
        where: {
          id: updateRequest.id
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...objWithoutUndefinedFields(updateRequest.policy),
          familyMembers: PoliciesService.familyMembersAsInput(updateRequest.policy.familyMembers)
        }
      })
    })
  }

  public searchPolicies = async (search: SearchPolicyRequest = {}): Promise<Array<PolicyDto>> => {
    applicationLogger.debug("Searching policies for input", search)
    const query = PoliciesService._parseQuery(search)
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
        familyMembers: true,
        deleted: true,
        customerId: true
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
        policyChangeType: policyChangeType,
        familyMembers: PoliciesService.familyMembersAsInput(policy.familyMembers)
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
        policyCreatedAt: true,
        familyMembers: true
      }
    })
  }
}

export class PoliciesValidator {
  private static UUID_REGEXP = new RegExp("^[\\da-f]{8}-[\\da-f]{4}-[1-5][\\da-f]{3}-[89ab][\\da-f]{3}-[\\da-f]{12}$")


  /**
   * @throws(InvalidEntityException)
   * @param date
   * @param fieldName
   */
  public static validateDate(date: unknown, fieldName: string) {
    if (!(date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(<number>date))) {
      throw new InvalidEntityException(fieldName + " should be a date, but got " + date + " instead")
    }
  }

  /**
   * @throws(InvalidEntityException)
   * @param str
   * @param fieldName
   */
  public static validateString(str: unknown, fieldName: string) {
    if (!(str && (typeof str === "string" || str instanceof String))) {
      throw new InvalidEntityException(fieldName + " should be a correct string, but got " + str + " instead")
    }
  }

  /**
   * @throws(InvalidEntityException)
   * @param policy
   */
  public static validateUpdatePolicy(policy: UpdatePolicy) {
    if (policy.endDate) {
      this.validateDate(policy.endDate, "endDate")
    }
    if (policy.startDate) {
      this.validateDate(policy.startDate, "startDate")
    }
    if (policy.status) {
      this.validateString(policy.status, "status")
    }
    if (policy.insuranceType) {
      this.validateString(policy.insuranceType, "insuranceType")
    }
    if (policy.customerId) {
      this.validateUuid(policy.customerId, "customerId")
    }
    if (policy.provider) {
      this.validateString(policy.provider, "provider")
    }
    if (policy.familyMembers) {
      this.validateFamilyMembers(policy.familyMembers)
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
    if (policy.familyMembers) {
      this.validateFamilyMembers(policy.familyMembers)
    }
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
  public static validateUuid(id: unknown, fieldName: string) {
    this.validateString(id, fieldName)
    if (!PoliciesValidator.UUID_REGEXP.test(<string>id)) {
      throw new InvalidEntityException(fieldName + " should be a correct uuid, but got " + id + " instead")
    }
  }

  public static validateFamilyMembers(familyMembers: Prisma.JsonValue) {
    const members = familyMembers as unknown as FamilyMembers
    for (let i = 0; i < members.length; i++) {
      this.validateString(members[i].firstName, `familyMembers[${i}].firstName`)
      this.validateString(members[i].lastName, `familyMembers[${i}].lastName`)
    }
  }
}
