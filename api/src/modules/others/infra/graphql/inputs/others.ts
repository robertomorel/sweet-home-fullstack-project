import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class OthersInput {
  @Field()
  readonly anualTax: number;

  @Field()
  readonly hasGarage: 'T' | 'F';

  @Field()
  readonly pool: 'T' | 'F';

  @Field()
  readonly virtualTourLink: string;

  @Field()
  readonly parcelNumber: number;

  @Field()
  readonly lastSold: Date;
}

@InputType()
export class DeleteOthersInput {
  @Field()
  readonly id: string;
}
