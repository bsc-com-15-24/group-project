import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, } from 'typeorm';
import { Question } from '../questions/question.entity';
import { User } from '../user/user-entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('clob')
  content: string;

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  question: Question;

  @ManyToOne(() => User)
  author: User;
}
