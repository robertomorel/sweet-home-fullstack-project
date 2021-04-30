import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Facts from 'src/shared/infra/typeorm/entities/facts.entity';
import Overview from 'src/shared/infra/typeorm/entities/overview.entity';
import Property from 'src/shared/infra/typeorm/entities/property.entity';
import RepoService from './repo.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Facts, Property, Overview]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
