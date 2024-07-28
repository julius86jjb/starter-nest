import { IsBoolean, IsOptional } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { Question } from 'src/products/questions/entities/question.entity';
import { Review } from 'src/products/reviews/entities/review.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Store)
  @JoinColumn()
  store: Store;

  @OneToMany(() => Order, (order) => order.buyer, { cascade: true, eager: true })
  orders?: Order[];

  @OneToMany(() => Question, (question) => question.user, {
    cascade: true,
    eager: true,
  })
  questions?: Order[];

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
    eager: true,
  })
  reviews?: Review[];

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text', {
    unique: true,
  })
  userName: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text')
  country: string;

  @Column('text')
  city: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  phone: string;

  @Column('text')
  address: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  img: string;

  @Column('bool', {
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
