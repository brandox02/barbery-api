import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateCompanyInput {
  exampleField: number;
}
