import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Message from 'src/shared/infra/typeorm/entities/message.entity';
import User from 'src/shared/infra/typeorm/entities/user.entity';
import Facts from 'src/shared/infra/typeorm/entities/facts.entity';
import Property from 'src/shared/infra/typeorm/entities/property.entity';
import Overview from 'src/shared/infra/typeorm/entities/overview.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Facts) public readonly factsRepo: Repository<Facts>,
    @InjectRepository(Property) public readonly propertyRepo: Repository<Property>,
    @InjectRepository(Overview) public readonly overviewRepo: Repository<Overview>,
  ) {}
}

export default RepoService;
