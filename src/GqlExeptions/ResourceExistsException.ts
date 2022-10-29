import { HttpStatus } from "@nestjs/common";
import { GraphQLError } from "graphql";

export const ResourceExistsException = (resourceName = "resource") =>
  new GraphQLError(
    `Is not possible to create a ${resourceName} with the given definition because another ${resourceName} already exists with the same attributes`,
    {
      extensions: {
        exception: {
          code: HttpStatus.FORBIDDEN.toString(),
        },
      },
    }
  );
