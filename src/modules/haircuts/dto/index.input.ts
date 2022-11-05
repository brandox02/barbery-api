import { InputType } from "@nestjs/graphql";

@InputType()
export class HaircutInput {
  id?: number;
  name?: string;

  image?: string;

  price?: number;

  duration?: string;

  enabled?: boolean;
}
