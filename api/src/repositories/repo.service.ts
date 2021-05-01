import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Facts from 'src/shared/infra/typeorm/entities/facts.entity';
import Property from 'src/shared/infra/typeorm/entities/property.entity';
import Overview from 'src/shared/infra/typeorm/entities/overview.entity';
import Others from 'src/shared/infra/typeorm/entities/others.entity';
import Visits from 'src/shared/infra/typeorm/entities/visits.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Facts) public readonly factsRepo: Repository<Facts>,
    @InjectRepository(Property)
    public readonly propertyRepo: Repository<Property>,
    @InjectRepository(Overview)
    public readonly overviewRepo: Repository<Overview>,
    @InjectRepository(Others)
    public readonly othersRepo: Repository<Others>,
    @InjectRepository(Visits)
    public readonly visitsRepo: Repository<Visits>,
  ) {}
}

export default RepoService;
