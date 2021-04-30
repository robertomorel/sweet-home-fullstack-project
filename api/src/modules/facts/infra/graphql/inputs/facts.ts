import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class FactsInput {
  @Field()
  readonly type: string;

  @Field()
  readonly yearBuilt: number;

  @Field()
  readonly heating: string;

  @Field()
  readonly parking: string;

  @Field()
  readonly lot: string;

  @Field()
  readonly stories: number;
}

@InputType()
export class DeleteFactsInput {
  @Field()
  readonly id: string;
}