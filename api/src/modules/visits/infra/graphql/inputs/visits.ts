import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class VisitsInput {
  @Field()
  readonly total: number;

  @Field()
  readonly lastVisited: Date;
}

@InputType()
export class DeleteVisitsInput {
  @Field()
  readonly id: string;
}
