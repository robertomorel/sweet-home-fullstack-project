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

import { context } from 'src/db/loaders';
import RepoService from 'src/repositories/repo.service';
import Message from 'src/shared/infra/typeorm/entities/message.entity';
import User from 'src/shared/infra/typeorm/entities/user.entity';
import MessageInput, { DeleteMessageInput } from '../inputs/message';

export const pubSub = new PubSub();

@Resolver(() => Message)
export default class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => [Message])
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      userId: input.userId,
      content: input.content,
    });

    const response = await this.repoService.messageRepo.save(message);

    pubSub.publish('messageAdded', { messageAdded: message });

    return response;
  }

  @Mutation(() => Message)
  public async deleteMessage(
    @Args('data') input: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne(input.id);

    if (!message || message.userId !== input.userId)
      throw new Error(
        'Message does not exists or you are not the message author',
      );

    const copy = { ...message };

    await this.repoService.messageRepo.remove(message);

    return copy;
  }

  // Trigger
  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(
    @Parent() parent: Message,
    @Context() { UserLoader }: typeof context,
  ): Promise<User> {
    return UserLoader.load(parent.userId); // With DataLoader
    // return this.repoService.userRepo.findOne(parent.userId); // Without DataLoader
  }
}
