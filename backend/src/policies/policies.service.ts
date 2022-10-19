import { Injectable } from '@nestjs/common';
import { InsuranceType, PolicyStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';
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
    provider?: string;
  };
};

@Injectable()
export class PoliciesService {
  constructor(private prisma: PrismaService) {}

  create(createPolicyDto: CreatePolicyDto) {
    return 'This action adds a new policy';
  }

  async find({
    pagination: { skip, take },
    filters,
    search,
  }: RequestWithPaginationAndFilters): Promise<
    PaginatedResponse<{
      id: string;
      provider: string;
      insuranceType: InsuranceType;
      status: PolicyStatus;
      startDate: Date;
      customer: {
        id: string;
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
      };
    }>
  > {
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

    // Handle search condition | provider
    if (search.provider) {
      ANDCondition.push({
        provider: {
          contains: search.provider,
          mode: 'insensitive',
        },
      });
    }

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
