import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import Facts from 'src/shared/infra/typeorm/entities/facts.entity';

const batchUsers = async (factsIds: string[]) => {
  const facts = await getRepository(Facts).findByIds(factsIds);

  const factsIdsMap: { [factsIds: number]: Facts } = {};

  facts.forEach(f => {
    factsIdsMap[f.id] = facts;
  });

  return factsIds.map(factsId => factsIdsMap[factsId]);
};

export default () => new DataLoader(batchUsers);
