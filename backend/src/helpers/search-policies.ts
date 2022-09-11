import { InsuranceType, PolicyStatus, Prisma } from '@prisma/client';

type SearchParams = {
    field: string;
    value: string;
    insuranceType: InsuranceType[];
    policyStatus: PolicyStatus[];
}

function buildSearchRequest({ policyStatus = [], insuranceType = [], value = "", field= "" }: SearchParams) {
    const search: Prisma.PolicyWhereInput = {
        AND: [
            {
                status: {
                    ...policyStatus.length > 0 && {
                        in: policyStatus
                    }
                },
                ...insuranceType.length > 0 && {
                    insuranceType: { in: insuranceType }
                },
                ...!!value && getFieldSearchPredicate(value, field)
            }
        ]
    };

    return search;
}


function getFieldSearchPredicate(value:string, field:string) {
    const caseInsensitiveEqualsPredicate: Prisma.StringFilter = { equals: value as string, mode: "insensitive" };
    switch (field) {
        case "CLIENT_FIRSTNAME": return {
            client: {
                firstName: caseInsensitiveEqualsPredicate
            }
        }
        case "CLIENT_LASTNAME": return {
            client: {
                lastName: caseInsensitiveEqualsPredicate
            }
        }
        case "DEPENDANT_FIRSTNAME": return {
            dependants: {
                some: {
                    dependant: {
                        firstName: caseInsensitiveEqualsPredicate
                    }
                },
            }
        }
        case "DEPENDANT_LASTNAME": return {
            dependants: {
                some: {
                    dependant: {
                        lastName: caseInsensitiveEqualsPredicate
                    }
                },
            }
        }
        default: return {
            OR: [{
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
                                firstName: caseInsensitiveEqualsPredicate
                            }
                        },
                    }
                },
                {
                    dependants: {
                        some: {
                            dependant: {
                                lastName: caseInsensitiveEqualsPredicate
                            }
                        },
                    }
                }
            ]
        } 
    }
}

export {
    buildSearchRequest
}