import { GraphQLError } from "graphql";
import { HttpStatus } from "@nestjs/common";

export const NotFoundException = () =>
  new GraphQLError("Resource not found", {
    extensions: {
      exception: {
        code: HttpStatus.NOT_FOUND.toString(),
      },
    },
  });
