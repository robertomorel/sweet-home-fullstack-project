import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from 'src/repositories/repo.service';
import Visits from 'src/shared/infra/typeorm/entities/visits.entity';
import VisitsInput, { DeleteVisitsInput } from '../inputs/visits';


@Resolver(() => Visits)
export default class VisitsResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Visits])
  public async getAllVisits(): Promise<Visits[]> {
    return this.repoService.visitsRepo.find();
  }

  @Query(() => Visits, { nullable: true })
  public async getVisits(
    @Args('id') id: string,
  ): Promise<Visits | undefined> {
    return this.repoService.visitsRepo.findOne(id);
  }

  @Mutation(() => Visits)
  public async createVisits(
    @Args('data') input: VisitsInput,
  ): Promise<Visits> {
    let visits = await this.repoService.visitsRepo.findOne({
      where: {
        total: input.total,
        lastVisited: input.lastVisited,
      },
    });

    if (!visits) {
      visits = this.repoService.visitsRepo.create({
        total: input.total,
        lastVisited: input.lastVisited,
      });

      await this.repoService.visitsRepo.save(visits);
    }

    return visits;
  }

  @Mutation(() => Visits)
  public async deleteVisits(
    @Args('data') input: DeleteVisitsInput,
  ): Promise<void> {
    const visits = await this.getVisits(input.id);

    if (!visits) {
      throw new Error('No visits were found!');
    }

    await this.repoService.visitsRepo.delete(visits);
  }
}
