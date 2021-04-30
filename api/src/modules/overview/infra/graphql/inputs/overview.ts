import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class OverviewInput {
  @Field()
  readonly price: number;

  @Field()
  readonly beds: number;

  @Field()
  readonly baths: number;

  @Field()
  readonly neighborhood: string;

  @Field()
  readonly address: string;

  @Field()
  readonly city: string;

  @Field()
  readonly zipcode: number;

  @Field()
  readonly available: 'T' | 'F';
}

@InputType()
export class DeleteOverviewInput {
  @Field()
  readonly id: string;
}