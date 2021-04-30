import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateFacts1619724345874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'facts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'yearBuilt',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'heating',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'parking',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'lot',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'stories',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('facts');
  }
}