import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Facts from 'src/shared/infra/typeorm/entities/facts.entity';
import Message from 'src/shared/infra/typeorm/entities/message.entity';
import Overview from 'src/shared/infra/typeorm/entities/overview.entity';
import Property from 'src/shared/infra/typeorm/entities/property.entity';
import User from 'src/shared/infra/typeorm/entities/user.entity';
import RepoService from './repo.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Facts, Property, Overview])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
