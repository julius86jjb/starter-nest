import { User } from 'src/users/entities/user.entity';
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
import { SocialNetwork } from '../interfaces/social-network.interface';
import { Product } from 'src/products/entities/product.entity';
import { Question } from 'src/products/questions/entities/question.entity';
import { Review } from 'src/products/reviews/entities/review.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Product, (product) => product.store, {
    cascade: true,
    eager: true,
  })
  products?: Product[];

  @OneToMany(() => Question, (question) => question.store, {
    cascade: true,
    eager: true,
  })
  questions?: Question[];

  @OneToMany(() => Review, (review) => review.store, {
    cascade: true,
    eager: true,
  })
  reviews?: Review[];

  @OneToMany(() => Order, (order) => order.store, {
    cascade: true,
    eager: true,
  })
  orders?: Order[];

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    unique: true,
  })
  phone: string;

  @Column('text')
  address: string;

  @Column('text')
  description: string;

  @Column('text')
  about: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  logo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  cover_img: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  social_networks: SocialNetwork[];

  @Column('int', {
    default: 0,
  })
  products_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.name;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    // siempre tenermos slug antes de update
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
