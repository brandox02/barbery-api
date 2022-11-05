import { ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
