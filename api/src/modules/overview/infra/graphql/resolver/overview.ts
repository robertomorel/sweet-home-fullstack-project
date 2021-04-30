import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from 'src/repositories/repo.service';
import OverviewInput, { DeleteOverviewInput } from '../inputs/overview';
import Overview from 'src/shared/infra/typeorm/entities/overview.entity';

@Resolver(() => Overview)
export default class OverviewResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Overview])
  public async getAllOverview(): Promise<Overview[]> {
    return this.repoService.overviewRepo.find();
  }

  @Query(() => Overview, { nullable: true })
  public async getOverview(@Args('id') id: string): Promise<Overview | undefined> {
    return this.repoService.overviewRepo.findOne(id);
  }

  @Mutation(() => Overview)
  public async createOverview(
    @Args('data') input: OverviewInput,
  ): Promise<Overview> {
    let overview = await this.repoService.overviewRepo.findOne({
      where: { 
        price: input.price,
        beds: input.beds,
        baths: input.baths,
        neighborhood: input.neighborhood,
        address: input.address,
        city: input.city,
        zipcode: input.zipcode,
        available: input.available,
      },
    });

    if (!overview) {
      overview = this.repoService.overviewRepo.create({
        price: input.price,
        beds: input.beds,
        baths: input.baths,
        neighborhood: input.neighborhood,
        address: input.address,
        city: input.city,
        zipcode: input.zipcode,
        available: input.available,
      });

      await this.repoService.overviewRepo.save(overview);
    }

    return overview;
  }

  @Mutation(() => Overview)
  public async deleteOverview(
    @Args('data') input: DeleteOverviewInput,
  ): Promise<void> {
    const overview = await this.getOverview(input.id)

    if (!overview) {
      throw new Error(
        'No overview were found!',
      );
    };

    await this.repoService.overviewRepo.delete(overview);
  }
}
