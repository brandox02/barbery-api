import { CreateGeneralParameterInput } from './create-general-parameter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGeneralParameterInput extends PartialType(CreateGeneralParameterInput) {
  @Field(() => Int)
  id: number;
}
