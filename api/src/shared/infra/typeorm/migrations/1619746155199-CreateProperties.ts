import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProperties1619746155199
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'homeImage',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'images',
            type: 'varchar',
            length: '350',
            isNullable: false,
          },
          {
            name: 'facts_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'overview_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'others_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'visits_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FactsProps',
            columnNames: ['facts_id'],
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedTableName: 'facts',
          },
          {
            name: 'OverviewProps',
            columnNames: ['overview_id'],
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedTableName: 'overview',
          },
          {
            name: 'OthersProps',
            columnNames: ['others_id'],
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedTableName: 'others',
          },
          {
            name: 'VisitsProps',
            columnNames: ['visits_id'],
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedTableName: 'visits',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}
