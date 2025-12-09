import { PartialType } from '@nestjs/swagger';
import { CreateBranchPricingDto } from './create-branch-pricing.dto';

export class UpdateBranchPricingDto extends PartialType(CreateBranchPricingDto) {}

