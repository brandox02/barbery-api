import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class HaircutInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  duration?: string;

  @Field({ nullable: true })
  enabled?: boolean;
}
