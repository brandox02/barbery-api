import { GraphQLError } from "graphql";
import { HttpStatus } from "@nestjs/common";

export const UnauthorizedException = () =>
  new GraphQLError("You are not authenticated into the app", {
    extensions: {
      exception: {
        code: HttpStatus.UNAUTHORIZED.toString(),
      },
    },
  });
