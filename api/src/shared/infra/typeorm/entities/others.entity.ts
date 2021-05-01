import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Property from './property.entity';

@ObjectType()
@Entity({ name: 'others' })
export default class Others {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  anualTax: number;

  @Field()
  @Column()
  hasGarage: 'T' | 'F';

  @Field()
  @Column()
  pool: 'T' | 'F';

  @Field()
  @Column()
  virtualTourLink: string;

  @Field()
  @Column()
  parcelNumber: number;

  @Field()
  @Column()
  lastSold: Date;

  @OneToOne(
    () => Property,
    property => property.othersConnection,
  )
  propertyConnection: Promise<Property>;

  @Field()
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
