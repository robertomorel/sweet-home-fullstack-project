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
@Entity({ name: 'overview' })
export default class Overview {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Field()
  @Column()
  beds: number;

  @Field()
  @Column({
    type: 'decimal',
    precision: 2,
    scale: 1,
  })
  baths: number;

  @Field()
  @Column()
  neighborhood: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  zipcode: number;

  @Field()
  @Column()
  available: 'T' | 'F';

  @OneToOne(() => Property, property => property.overviewConnection)
  propertyConnection: Promise<Property>;

  @Field()
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
