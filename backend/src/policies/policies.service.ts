import { Injectable } from '@nestjs/common';
import { Policy } from '@prisma/client';
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
    name: string;
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
  }: RequestWithPaginationAndFilters): Promise<PaginatedResponse<Policy>> {
    const results = await this.prisma.$transaction([
      this.prisma.policy.findMany(),
      this.prisma.policy.findMany({
        skip,
        take,
        include: {
          customer: true,
        },
      }),
    ]);

    return {
      data: results[1],
      pagination: {
        skip,
        take,
        total: results[0].length,
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
