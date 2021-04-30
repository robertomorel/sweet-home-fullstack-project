import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import Facts from 'src/shared/infra/typeorm/entities/facts.entity';
import RepoService from 'src/repositories/repo.service';
import FactsInput, { DeleteFactsInput } from '../inputs/facts';

@Resolver(() => Facts)
export default class FactsResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Facts])
  public async getAllFacts(): Promise<Facts[]> {
    return this.repoService.factsRepo.find();
  }

  @Query(() => Facts, { nullable: true })
  public async getFacts(@Args('id') id: string): Promise<Facts | undefined> {
    return this.repoService.factsRepo.findOne(id);
  }

  @Mutation(() => Facts)
  public async createFacts(@Args('data') input: FactsInput): Promise<Facts> {
    let facts = await this.repoService.factsRepo.findOne({
      where: {
        type: input.type,
        yearBuilt: Number(input.yearBuilt),
        heating: input.heating,
        parking: input.parking,
        lot: input.lot,
        stories: Number(input.stories),
      },
    });

    if (!facts) {
      facts = this.repoService.factsRepo.create({
        type: input.type,
        yearBuilt: Number(input.yearBuilt),
        heating: input.heating,
        parking: input.parking,
        lot: input.lot,
        stories: Number(input.stories),
      });

      await this.repoService.factsRepo.save(facts);
    }

    return facts;
  }

  @Mutation(() => Facts)
  public async deleteFacts(
    @Args('data') input: DeleteFactsInput,
  ): Promise<void> {
    const facts = await this.getFacts(input.id);

    if (!facts) {
      throw new Error('No facts were found!');
    }

    await this.repoService.factsRepo.delete(facts);
  }
}
