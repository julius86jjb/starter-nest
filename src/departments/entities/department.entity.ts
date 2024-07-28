import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Category, (category) => category.department, { cascade: true, eager: true })
  categories?: Category[];

  @OneToMany(() => Product, (product) => product.department, {
    cascade: true,
  })
  products?: Product[];

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', {
    array: true,
    default: [],
  })
  titles: string[];

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('text', {
    nullable: true,
  })
  img: string;

  @Column('text')
  icon: string;

  @Column('numeric', {
    default: 0
  })
  views?: number;

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
