import { InsuranceType, PolicyStatus, Prisma } from '@prisma/client';

type SearchParams = {
    searchKey: String;
    insuranceType: InsuranceType[];
    status: PolicyStatus[];
}

function buildSearchRequest({ status = [], insuranceType = [], searchKey = "" }: SearchParams) {
    const caseInsensitiveEqualsPredicate: Prisma.StringFilter = { equals: searchKey as string, mode: "insensitive" };

    const search: Prisma.PolicyWhereInput = {
        AND: [
            {
                status: {
                    notIn: ["CANCELLED", "DROPPED_OUT"],
                    ...status.length > 0 && {
                        in: status
                    }
                },
                ...insuranceType.length > 0 && {
                    insuranceType: { in: insuranceType }
                },
                ...!!searchKey.trim() && {
                    OR: [{
                        provider: caseInsensitiveEqualsPredicate
                    },
                    {
                        client: {
                            firstName: caseInsensitiveEqualsPredicate
                        }
                    },
                    {
                        client: {
                            lastName: caseInsensitiveEqualsPredicate
                        }
                    },
                    {
                        dependants: {
                            some: {
                                dependant: {
                                    firstName: { equals: searchKey as string, not: "", mode: "insensitive" }
                                }
                            },
                        }
                    },
                    {
                        dependants: {
                            some: {
                                dependant: {
                                    lastName: { equals: searchKey as string, not: "", mode: "insensitive" }
                                }
                            },
                        }
                    }
                    ]
                }
            }
        ]
    };

    return search;
}

export {
    buildSearchRequest
}