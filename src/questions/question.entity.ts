import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, } from 'typeorm';
import { User } from '../user/user-entity';
import { Course } from '../courses/course.entity';
import { Answer } from '../answers/answer.entity';

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

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  author: User;

  @Column({ nullable: true })
  courseId: number;

  @ManyToOne(() => Course, { nullable: true })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
