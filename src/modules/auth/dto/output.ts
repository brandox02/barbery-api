import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string;
}

@ObjectType()
export class GetUserInfo {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  isAdmin?: boolean;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  imageId: string;
}
