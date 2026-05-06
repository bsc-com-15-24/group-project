import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('clob')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
