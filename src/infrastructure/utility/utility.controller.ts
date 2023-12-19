import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/utility')
@ApiTags('Utility')
export class UtilityController {}
