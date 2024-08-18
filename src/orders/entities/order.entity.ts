import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
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

export enum Stage {
  reviewed = 'reviewed',
  sent = 'sent',
  delivered = 'delivered',
}

export class Status {
  @IsString()
  @IsEnum(Stage)
  stage: Stage;

  @IsString()
  @IsOptional()
  comment?: string | null;

  @IsBoolean()
  completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity({name:'orders'})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Store, (store) => store.orders, {onDelete : 'CASCADE'})
  store: Store;

  @ManyToOne(() => Product, (product) => product.orders, {eager: true})
  product: Product;

  @ManyToOne(() => User, (user) => user.orders, {onDelete : 'CASCADE'})
  buyer: User;

  @Column('numeric', {
    default: 1,
  })
  quantity: number;

  @Column('numeric')
  total_price: number;

  @Column({
    type: 'jsonb',
  })
  status: Status;

  @Column('boolean')
  completed: boolean;

  @Column('text')
  payment_method;

  @Column('text', {
    nullable: true,
  })
  idPayment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
