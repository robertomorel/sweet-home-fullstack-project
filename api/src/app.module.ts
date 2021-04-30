import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppService } from './app.service';
import * as ormOptions from './config/orm';
import { context } from './db/loaders';
import FactsResolver from './modules/facts/infra/graphql/resolver/facts';
import RepoModule from './repositories/repo.module';
import { AppController } from './controllers/app.controller';
import PropertyResolver from './modules/property/infra/graphql/resolver/property';
import OverviewResolver from './modules/overview/infra/graphql/resolver/overview';

const gqlImports = [
  FactsResolver,
  PropertyResolver,
  OverviewResolver,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true,
      context,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
