import { Controller, Get, Query } from '@nestjs/common';
import { PoliciesService } from './policies.service';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  find(@Query() query: { skip?: number; take?: number }) {
    return this.policiesService.find({
      skip: query.skip || 0,
      take: query.take || 10,
    });
  }
}
