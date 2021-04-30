import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class PropertiesInput {
  @Field()
  readonly homeImage: string;

  @Field()
  readonly images: string;

  @Field()
  readonly factsId: string;

  @Field()
  readonly overviewId: string;
}

@InputType()
export class DeletePropertiesInput {
  @Field()
  readonly id: string;

  @Field()
  readonly factsId: string;

  @Field()
  readonly overviewId: string;
}