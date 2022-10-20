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
import { ResponsePolicyDto } from './dto/policy-response.dto';
import { PolicyEntity } from './entities/policy.entity';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';

@Controller('policies')
@ApiTags('Policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Policy find method',
    type: Array<PolicyEntity>,
  })
  find(
    @Query('skip', new ParseIntPipe()) skip?: number,
    @Query('take', new ParseIntPipe()) take?: number,
    @Query('filterStatus') filterStatus?: string,
    @Query('filterType') filterType?: string,
    @Query('searchCustomerName') searchCustomerName?: string,
    @Query('searchProvider') searchProvider?: string,
  ): Promise<PaginatedResponse<ResponsePolicyDto>> {
    // Format & clean filters (should have used a custom Pipe)
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

  // Not used, kept them only for Swagger documentation
  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found policy',
    type: PolicyEntity,
  })
  findOne(@Param('id') id: string): Promise<PolicyEntity> {
    return this.policiesService.findOne(id) as any;
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
