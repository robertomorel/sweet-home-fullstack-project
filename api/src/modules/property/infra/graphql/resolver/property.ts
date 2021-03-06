import {
  Args,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Subscription,
  Context,
} from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';
import RepoService from 'src/repositories/repo.service';
import Facts from 'src/shared/infra/typeorm/entities/facts.entity';
import Others from 'src/shared/infra/typeorm/entities/others.entity';
import Overview from 'src/shared/infra/typeorm/entities/overview.entity';
import Property from 'src/shared/infra/typeorm/entities/property.entity';
import Visits from 'src/shared/infra/typeorm/entities/visits.entity';
import PropertiesInput, { DeletePropertiesInput } from '../inputs/property';

//import { context } from '../db/loaders';

export const pubSub = new PubSub();

@Resolver(() => Property)
export default class PropertyResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Property])
  public async getProperties(): Promise<Property[]> {
    return this.repoService.propertyRepo.find();
  }

  @Query(() => Property, { nullable: true })
  public async getProperty(
    @Args('id') id: string,
  ): Promise<Property | undefined> {
    return this.repoService.propertyRepo.findOne(id);
  }

  @Query(() => [Property])
  public async getPropertyByFactsId(
    @Args('factsId') factsId: string,
  ): Promise<Property | undefined> {
    return this.repoService.propertyRepo.findOne({
      where: { factsId },
    });
  }

  @Query(() => [Property])
  public async getPropertyByOverviewId(
    @Args('overviewId') overviewId: string,
  ): Promise<Property | undefined> {
    return this.repoService.propertyRepo.findOne({
      where: { overviewId },
    });
  }

  @Query(() => [Property])
  public async getPropertyByOthersId(
    @Args('othersId') othersId: string,
  ): Promise<Property | undefined> {
    return this.repoService.propertyRepo.findOne({
      where: { othersId },
    });
  }

  @Query(() => [Property])
  public async getPropertyByVisitsId(
    @Args('visitsId') visitsId: string,
  ): Promise<Property | undefined> {
    return this.repoService.propertyRepo.findOne({
      where: { visitsId },
    });
  }

  @Mutation(() => Property)
  public async createProperty(
    @Args('data') input: PropertiesInput,
  ): Promise<Property> {
    const property = this.repoService.propertyRepo.create({
      homeImage: input.homeImage,
      images: input.images,
      factsId: input.factsId,
      overviewId: input.overviewId,
      othersId: input.othersId,
      visitsId: input.visitsId,
    });

    const response = await this.repoService.propertyRepo.save(property);

    pubSub.publish('propertyAdded', { propertyAdded: property });

    return response;
  }

  @Mutation(() => Property)
  public async deleteProperty(
    @Args('data') input: DeletePropertiesInput,
  ): Promise<Property> {
    const property = await this.repoService.propertyRepo.findOne(input.id);

    if (
      !property ||
      property.factsId !== input.factsId ||
      property.overviewId !== input.overviewId ||
      property.othersId !== input.othersId ||
      property.visitsId !== input.visitsId
    )
      throw new Error('No property was found!');

    const copy = { ...property };

    await this.repoService.propertyRepo.remove(property);

    return copy;
  }

  @Subscription(() => Property)
  propertyAdded() {
    return pubSub.asyncIterator('propertyAdded');
  }

  @ResolveField(() => Facts, { name: 'facts' })
  public async getFacts(@Parent() parent: Property): Promise<Facts> {
    return this.repoService.factsRepo.findOne(parent.factsId);
  }

  @ResolveField(() => Overview, { name: 'overview' })
  public async getOverview(@Parent() parent: Property): Promise<Overview> {
    return this.repoService.overviewRepo.findOne(parent.overviewId);
  }

  @ResolveField(() => Others, { name: 'others' })
  public async getOthers(@Parent() parent: Property): Promise<Others> {
    return this.repoService.othersRepo.findOne(parent.othersId);
  }

  @ResolveField(() => Visits, { name: 'visits' })
  public async getVisits(@Parent() parent: Property): Promise<Visits> {
    return this.repoService.visitsRepo.findOne(parent.visitsId);
  }
  /*
  @ResolveField(() => Fact, { name: 'facts' })
  public async getFacts(
    @Parent() parent: Property,
    //@Context() { UserLoader }: typeof context,
  ): Promise<Fact | undefined> {
    //return UserLoader.load(parent.userId); // With DataLoader
    return this.repoService.factsRepo.findOne(parent.factsId); // Without DataLoader
  }
  */
}
