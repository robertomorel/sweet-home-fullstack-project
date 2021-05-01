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
@Entity({ name: 'visits' })
export default class Visits {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  lastVisited: Date;

  @OneToOne(
    () => Property,
    property => property.visitsConnection,
  )
  propertyConnection: Promise<Property>;

  @Field()
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
