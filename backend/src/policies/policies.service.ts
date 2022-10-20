import { Injectable } from '@nestjs/common';
import { InsuranceType, PolicyStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { ResponsePolicyDto } from './dto/policy-response.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

export type RequestWithPaginationAndFilters = {
  pagination: {
    skip: number;
    take: number;
  };
  filters: {
    status?: PolicyStatus[];
    type?: InsuranceType[];
  };
  search: {
    customerName?: string;
    customerRelatives?: string;
    provider?: string;
  };
};

@Injectable()
export class PoliciesService {
  constructor(private prisma: PrismaService) {}

  async find({
    pagination: { skip, take },
    filters,
    search,
  }: RequestWithPaginationAndFilters): Promise<
    PaginatedResponse<ResponsePolicyDto>
  > {
    const { ANDCondition, ORCondition } = this.queryPoliciesBuilder({
      filters,
      search,
    });

    // Get the total count of policies also, using a transaction
    const [countRows, queryResult] = await this.prisma.$transaction([
      this.prisma.policy.count(),
      this.prisma.policy.findMany({
        skip,
        take,
        where: {
          ...(ANDCondition.length > 0 && { AND: ANDCondition }),
          ...(ORCondition.length > 0 && { OR: ORCondition }),
        },
        select: {
          id: true,
          provider: true,
          insuranceType: true,
          status: true,
          startDate: true,
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              dateOfBirth: true,
            },
          },
          relatives: {
            select: {
              id: true,
              role: true,
              relative: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  dateOfBirth: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      data: queryResult,
      pagination: {
        skip,
        take,
        total: countRows,
      },
    };
  }

  queryPoliciesBuilder({
    filters,
    search,
  }: {
    filters: RequestWithPaginationAndFilters['filters'];
    search: RequestWithPaginationAndFilters['search'];
  }): {
    ANDCondition: any[];
    ORCondition: any[];
  } {
    const ANDCondition = [];
    const ORCondition = [];

    // Handle status filter condition
    if (filters.status) {
      ANDCondition.push({
        status: {
          in: filters.status,
        },
      });
    }

    // Handle status filter condition
    if (filters.type) {
      ANDCondition.push({
        insuranceType: {
          in: filters.type,
        },
      });
    }

    // Handle search condition | customerName
    if (search.customerName) {
      ORCondition.push({
        customer: {
          firstName: {
            contains: search.customerName,
            mode: 'insensitive',
          },
        },
      });
      ORCondition.push({
        customer: {
          lastName: {
            contains: search.customerName,
            mode: 'insensitive',
          },
        },
      });
    }

    // Handle search condition | customerRelatives
    if (search.customerRelatives) {
      ORCondition.push({
        relatives: {
          some: {
            relative: {
              firstName: {
                contains: search.customerRelatives,
                mode: 'insensitive',
              },
            },
          },
        },
      });
      ORCondition.push({
        relatives: {
          some: {
            relative: {
              lastName: {
                contains: search.customerRelatives,
                mode: 'insensitive',
              },
            },
          },
        },
      });
    }

    // Handle search condition | provider
    if (search.provider) {
      ANDCondition.push({
        provider: {
          contains: search.provider,
          mode: 'insensitive',
        },
      });
    }

    return {
      ANDCondition,
      ORCondition,
    };
  }

  // Not used, kept them only for Swagger documentation
  create(createPolicyDto: CreatePolicyDto) {
    return 'This action adds a new policy';
  }

  async findOne(id: string) {
    const found = await this.prisma.policy.findFirst({
      where: {
        id,
      },
    });

    return found;
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
}
