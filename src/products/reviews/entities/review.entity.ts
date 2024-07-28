import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: string;

  @ManyToOne(() => Product, (product) => product.reviews, {
    nullable: true
  })
  product?: Product;

  @ManyToOne(() => Store, (store) => store.reviews, {
    nullable: true
  })
  store?: Store;

  @ManyToOne(() => User, (user) => user.reviews, {
    nullable: true
  })
  user: User;

  @Column('numeric')
  rate: number;

  @Column('text')
  title: string;

  @Column('text')
  message: string;

  @Column('numeric', {
    default: 0,
  })
  likes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
