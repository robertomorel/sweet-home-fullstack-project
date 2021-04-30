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
@Entity({ name: 'facts' })
export default class Facts {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  yearBuilt: number;

  @Field()
  @Column()
  heating: string;

  @Field()
  @Column()
  parking: string;

  @Field()
  @Column()
  lot: string;

  @Field()
  @Column()
  stories: number;

  @OneToOne(
    () => Property,
    property => property.factsConnection,
  )
  propertyConnection: Promise<Property>;

  @Field()
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
