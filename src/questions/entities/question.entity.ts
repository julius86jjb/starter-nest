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

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: string;

  @ManyToOne(() => Product, (product) => product.questions, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  product?: Product;

  @ManyToOne(() => Store, (store) => store.questions, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  store?: Store;

  @ManyToOne(() => User, (user) => user.questions, { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  question: string;

  @Column('text', {
    nullable: true
  })
  answer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
