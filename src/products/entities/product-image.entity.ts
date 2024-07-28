import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('product_images')
export class ProductImage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        (product) => product.images
    )
    product: Product

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}