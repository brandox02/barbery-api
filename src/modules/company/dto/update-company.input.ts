import { CreateCompanyInput } from "./create-company.input";
import { InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  id: number;
}
