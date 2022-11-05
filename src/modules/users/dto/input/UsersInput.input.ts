import { InputType } from "@nestjs/graphql";

@InputType()
export class UsersInput {
  id?: number;

  username?: string;

  email?: string;

  password?: string;

  firstname: string;

  lastname?: string;

  isAdmin?: boolean;

  image?: string;

  phoneNumber?: string;
}
