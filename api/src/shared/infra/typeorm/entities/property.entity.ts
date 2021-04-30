import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Facts from './facts.entity';
import Overview from './overview.entity';

@ObjectType()
@Entity({ name: 'properties' })
export default class Property {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  homeImage: string;

  @Field()
  @Column()
  images: string;

  // -- Facts ----------------------
  @Field()
  @Column({ name: 'facts_id' })
  factsId: string;

  @Field(() => Facts)
  facts: Facts;

  @OneToOne(
    () => Facts,
    fact => fact.propertyConnection,
    { eager: true, primary: true },
  )
  @JoinColumn({ name: 'facts_id' })
  factsConnection: Promise<Facts>;
  // -------------------------------

  // -- Overview -------------------
  @Field()
  @Column({ name: 'overview_id' })
  overviewId: string;

  @Field(() => Overview)
  overview_id: Overview;

  @OneToOne(
    () => Overview,
    overview => overview.propertyConnection,
    { eager: true, primary: true },
  )
  @JoinColumn({ name: 'overview_id' })
  overviewConnection: Promise<Overview>;
  // -------------------------------

  @Field()
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
