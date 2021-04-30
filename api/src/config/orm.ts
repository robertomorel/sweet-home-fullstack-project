import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/sweethome.db',
  logging: true,
  entities: [
    path.resolve(
      __dirname,
      '..',
      'shared',
      'infra',
      'typeorm',
      'entities',
      '*',
    ),
  ],
  migrations: [
    path.resolve(
      __dirname,
      '..',
      'shared',
      'infra',
      'typeorm',
      'migrations',
      '*',
    ),
  ],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};

module.exports = options;
