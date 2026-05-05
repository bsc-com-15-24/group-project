import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column()
    credits!: number;

    @Column({ nullable: true })
    instructor!: string;
}

