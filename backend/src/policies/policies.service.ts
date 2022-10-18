import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PoliciesService {
  constructor(private prisma: PrismaService) {}

  find({ skip, take }: { skip: number; take: number }) {
    return this.prisma.policy.findMany({
      skip,
      take,
    });
  }
}
