import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Resource } from 'src/resources/entities/resource.entity';

@Entity('courses')
export class Course {
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

  @OneToMany(() => Resource, (resource) => resource.course)
  resources!: Resource[];
}
