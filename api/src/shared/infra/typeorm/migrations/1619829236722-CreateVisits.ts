import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateVisits1619829236722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'visits',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'total',
            type: 'number',
            isNullable: false,
          },
          {
            name: 'lastVisited',
            type: 'timestampt',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestampt',
            isPrimary: false,
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestampt',
            isPrimary: false,
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('visits');
  }
}
