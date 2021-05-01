import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOthers1619811824969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'others',
        columns: [
        {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
        },
        {
            name: 'anualTax',
            type: 'decimal',
            isNullable: false,
            precision: 10,
            scale: 2,
        },
        {
            name: 'hasGarage',
            type: 'varchar',
            length: '1',
            isNullable: false,
        },
        {
            name: 'pool',
            type: 'varchar',
            length: '1',
            isNullable: false,
        },
        {
            name: 'virtualTourLink',
            type: 'varchar',
            length: '30',
            isNullable: false,
        },
        {
            name: 'parcelNumber',
            type: 'number',
            isNullable: false,
        },
        {
            name: 'lastSold',
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
    await queryRunner.dropTable('others');
  }
}
