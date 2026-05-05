import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Resource } from 'src/resources/entities/resource.entity';

@Entity('USERS')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column({default: 'student'})
    role!: string;

    @OneToMany(() => Resource, (resource) => resource.uploadedBy)
    resources: Resource[];
}