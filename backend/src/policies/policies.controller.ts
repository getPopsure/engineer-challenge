import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  Body,
  Delete,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse.dto';
import { InsuranceType, PolicyStatus } from '@prisma/client';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PolicyEntity } from './entities/policy.entity';

@Controller('policies')
@ApiTags('Policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Get()
  find(
    @Query('skip', new ParseIntPipe()) skip?: number,
    @Query('take', new ParseIntPipe()) take?: number,
    @Query('filterStatus') filterStatus?: string,
    @Query('filterType') filterType?: string,
    @Query('searchCustomerName') searchCustomerName?: string,
    @Query('searchProvider') searchProvider?: string,
  ): Promise<
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
    // Format & clean filters
    const status =
      filterStatus &&
      filterStatus !== '' &&
      (filterStatus
        ?.split(',')
        .map((value) => value.toUpperCase()) as PolicyStatus[]);

    const type =
      filterType &&
      filterType !== '' &&
      (filterType
        ?.split(',')
        .map((value) => value.toUpperCase()) as InsuranceType[]);

    return this.policiesService.find({
      pagination: {
        skip: skip || 0,
        take: take || 10,
      },
      filters: {
        status: status,
        type: type,
      },
      search: {
        customerName:
          searchCustomerName && searchCustomerName !== '' && searchCustomerName,
        provider: searchProvider && searchProvider !== '' && searchProvider,
      },
    });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found policy',
    type: PolicyEntity,
  })
  findOne(@Param('id') id: string): Promise<PolicyEntity> {
    return this.policiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(+id, updatePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policiesService.remove(+id);
  }
}
