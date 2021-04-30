import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOverviews1619749103637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'overview',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false,
            precision: 10,
            scale: 2,
          },
          {
            name: 'beds',
            type: 'number',
            isNullable: false,
          },
          {
            name: 'baths',
            type: 'decimal',
            isNullable: false,
            precision: 2,
            scale: 1,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'zipcode',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'available',
            type: 'varchar',
            length: '1',
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
    await queryRunner.dropTable('overview');
  }
}