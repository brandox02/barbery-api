import { HttpStatus } from "@nestjs/common";
import { GraphQLError } from "graphql";

export const UniqueConstraintException = (fieldNames: string[]) =>
  new GraphQLError(
    `Unique constraint: The field(s) ${fieldNames
      .map((x) => `'${x}'`)
      .join()} must be unique(s)`,
    {
      extensions: {
        exception: {
          code: HttpStatus.FORBIDDEN.toString(),
        },
      },
    }
  );
