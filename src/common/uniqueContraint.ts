import { pick } from "lodash";
import { UniqueConstraintException } from "src/GqlExeptions/UniqueConstraintException";
import { Repository } from "typeorm";

// throw error if the resource existe and must be unique
export async function uniqueConstraint<T>(
  repo: Repository<T>,
  input: any,
  uniqueKeys: string[]
) {
  if (!("id" in input)) {
    const where = pick(input, uniqueKeys);

    const found = await repo.findOne({ where });
    if (found) {
      throw UniqueConstraintException(uniqueKeys);
    }
  }
}
