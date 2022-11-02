import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGeneralParameterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
