import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from 'src/repositories/repo.service';
import Others from 'src/shared/infra/typeorm/entities/others.entity';
import OthersInput, { DeleteOthersInput } from '../inputs/others';


@Resolver(() => Others)
export default class OthersResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Others])
  public async getAllOthers(): Promise<Others[]> {
    return this.repoService.othersRepo.find();
  }

  @Query(() => Others, { nullable: true })
  public async getOthers(
    @Args('id') id: string,
  ): Promise<Others | undefined> {
    return this.repoService.othersRepo.findOne(id);
  }

  @Mutation(() => Others)
  public async createOthers(
    @Args('data') input: OthersInput,
  ): Promise<Others> {
    let others = await this.repoService.othersRepo.findOne({
      where: {
        anualTax: input.anualTax,
        hasGarage: input.hasGarage,
        pool: input.pool,
        virtualTourLink: input.virtualTourLink,
        parcelNumber: input.parcelNumber,
        lastSold: input.lastSold,
      },
    });

    if (!others) {
      others = this.repoService.othersRepo.create({
        anualTax: input.anualTax,
        hasGarage: input.hasGarage,
        pool: input.pool,
        virtualTourLink: input.virtualTourLink,
        parcelNumber: input.parcelNumber,
        lastSold: input.lastSold,
      });

      await this.repoService.othersRepo.save(others);
    }

    return others;
  }

  @Mutation(() => Others)
  public async deleteOthers(
    @Args('data') input: DeleteOthersInput,
  ): Promise<void> {
    const others = await this.getOthers(input.id);

    if (!others) {
      throw new Error('No others were found!');
    }

    await this.repoService.othersRepo.delete(others);
  }
}
