import { Module } from '@nestjs/common';
import { GeneralParameterService } from './general-parameter.service';
import { GeneralParameterResolver } from './general-parameter.resolver';

@Module({
  providers: [GeneralParameterResolver, GeneralParameterService]
})
export class GeneralParameterModule {}
