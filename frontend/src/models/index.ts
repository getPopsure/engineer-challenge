
enum PolicyStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    DROPPED_OUT = 'DROPPED_OUT'
}

enum InsuranceType {
    LIABILITY = "LIABILITY",
    HOUSEHOLD = "HOUSEHOLD",
    HEALTH = "HEALTH"
}

type UserDetails = {
    id: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String
}

type SearchPoliciesRequestBody = {
    value: String;
    field: String;
    insuranceType: any[];
    policyStatus: any[];
}

type SearchPoliciesResponseBody = {
    id: String;
    provider: String;
    insuranceType: InsuranceType;
    status: PolicyStatus;
    startDate: String;
    endDate: String;
    client: UserDetails;
    dependants: UserDetails[];
}

export type {
    SearchPoliciesRequestBody,
    SearchPoliciesResponseBody
};
export {
    InsuranceType,
    PolicyStatus
}
