import { IsBoolean, IsString } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Review } from 'src/reviews/entities/review.entity';
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
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Store, (store) => store.user, { eager: true })
  store?: Store;

  @OneToMany(() => Order, (order) => order.buyer, { eager: true })
  orders?: Order[];

  @OneToMany(() => Question, (question) => question.user, { eager: true })
  questions?: Question[];

  @OneToMany(() => Review, (review) => review.user, { eager: true })
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
    unique: true
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
  isActive: boolean;

  @Column('text', {
    array: true,
    default:['user']
  })
  roles: ValidRoles[] 

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
