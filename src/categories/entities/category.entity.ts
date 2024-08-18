import { Department } from 'src/departments/entities/department.entity';
import { Product } from 'src/products/entities/product.entity';
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

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Department,
    (department) => department.categories,
    { onDelete: 'CASCADE' }
  )
  department: Department;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];


  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  department_title: string;

  @Column('text', {
    unique: true,
  })
  slug?: string;

  @Column('text', {
    nullable: true,
  })
  img?: string;

  @Column('numeric', {
    default: 0,
  })
  inventory?: number;

  @Column('numeric', {
    default: 0,
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
