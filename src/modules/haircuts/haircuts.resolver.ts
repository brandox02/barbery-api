import { Mutation, Query, Resolver, Args } from "@nestjs/graphql";
import { HaircutInput } from "./dto/inputs";

import { Haircut } from "./entities/haircut.entity";
import { HaircutsService } from "./haircuts.service";

@Resolver()
export default class HaircutResolver {
  constructor(private readonly service: HaircutsService) {}
  @Query(() => [Haircut])
  async haircuts(@Args("where", { nullable: true }) where: HaircutInput = {}) {
    return this.service.findAll(where);
  }

  @Query(() => Haircut, { nullable: true })
  async haircut(@Args("where") where: HaircutInput = {}) {
    return this.service.findOne(where);
  }

  @Mutation(() => Haircut, {
    description:
      "create or update depending if send _id or not, if is create you need to send all entity fields without a _id, if is update just is obligatory send the _id field",
  })
  async saveHaircut(@Args("haircut") haircut: HaircutInput) {
    return this.service.save(haircut);
  }
}
