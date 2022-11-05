import { InputType } from "@nestjs/graphql";

@InputType()
export class UsersWhere {
  id?: number;

  username?: string;

  email?: string;

  password?: string;

  firstname?: string;

  lastname?: string;

  isAdmin?: boolean;

  image?: string;

  phoneNumber?: string;
}
