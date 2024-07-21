import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialNetwork } from '../interfaces/social-network.interface';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  about: string;

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

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  social_networks: SocialNetwork[];

  @Column('int', {
    default: 0,
  })
  products_count: number;

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

  // @Column()
  // logo: string;

  // @Column()
  // cover_img: string;

  // @Column()
  // user: User;
}
