import { Category } from 'src/categories/entities/category.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Discount } from '../interfaces/discount.interface';
import { HorizontalSlider } from '../interfaces/product_horizontal_slider';
import { ProductOption } from '../interfaces/product_option.interface';
import { ProductSpecification } from '../interfaces/product_specification.interface';
import { TopBanner } from '../interfaces/top_banner.interface';
import { Question } from 'src/questions/entities/question.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { ProductImage } from '../products-images/entities/product-image.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Department, (department) => department.products, { onDelete: 'CASCADE', eager: true })
  department: Department;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE', eager: true })
  category: Category;

  @ManyToOne(() => Store, (store) => store.products, { onDelete: 'CASCADE' })
  store: Store;

  @OneToMany(() => Question, (question) => question.product, {eager: true})
  questions?: Question[];

  @OneToMany(() => Review, (review) => review.product, {eager: true})
  reviews?: Review[];

  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[];

  @OneToMany(() => Order, (order) => order.store)
  orders?: Order[];


  @Column('text', {
    unique: true,
  })
  name: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  options: ProductOption[];

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('text', {
    nullable: true,
  })
  img_dest: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  features: string[];

  @Column('numeric')
  price: number;

  @Column('numeric')
  commision: number;

  @Column('numeric', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    nullable: true,
  })
  brand: string;

  @Column('text', {
    nullable: true,
  })
  description_title: string;

  @Column('text', {
    nullable: true,
  })
  description_text: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  specifications: ProductSpecification[];

  @Column('numeric')
  shipping: number;

  @Column('numeric')
  delivery_time: number;

  @Column('text', {
    nullable: true,
  })
  default_banner: string;

  @Column('text', {
    nullable: true,
  })
  vertical_slider: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  discount?: Discount;

  @Column('text', {
    nullable: true,
  })
  video?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  top_banner?: TopBanner;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  horizontal_slider?: HorizontalSlider;

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
