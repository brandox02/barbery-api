import { isNil, omit, omitBy } from "lodash";
import { DataSource, EntityManager } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsProvider {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async withTransaction(fn: (...args: any) => void) {
    return async (...args: any) => {
      const response = await this.dataSource.transaction(
        async (txn: EntityManager) => {
          return fn(txn, ...args);
        }
      );
      return response;
    };
  }

  buildWhere(
    alias: string,
    where: any,
    customWhere?: { query: string; field: string; value: any }[]
  ): [string, any] {
    where = omit(
      where,
      customWhere && customWhere.length ? customWhere.map((x) => x.field) : []
    );
    let computed = Object.keys(where)
      .map((curr) => `${alias}.${curr} = :${curr}`)
      .join(" AND ");

    if (customWhere && customWhere.length) {
      customWhere.forEach((item, index) => {
        if (index === 0) {
          if (Object.keys(where).length) {
            computed += " AND ";
          }
        } else {
          computed += " AND ";
        }

        computed += item.query;
      });
    }

    const customWhereKeysValues =
      customWhere && customWhere.length
        ? customWhere.reduce(
            (acc, curr) => ({ ...acc, [curr.field]: curr.value }),
            {}
          )
        : {};

    return [
      computed,
      {
        ...where,
        ...customWhereKeysValues,
      },
    ];
  }

  removeNullFields<T>(obj: any): Partial<T> {
    return omitBy(obj, isNil);
  }
}
