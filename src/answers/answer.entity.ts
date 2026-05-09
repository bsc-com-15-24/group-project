import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from '../questions/question.entity';
import { User } from '../user/user-entity';
import { Resource } from '../resources/entities/resource.entity';

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

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  author: User;

  @Column({ nullable: true })
  resourceId: number;

  @ManyToOne(() => Resource, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'resourceId' })
  resource: Resource;
}
