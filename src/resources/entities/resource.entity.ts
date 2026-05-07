// ================= ENTITY =================
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user-entity';
import { Course } from 'src/courses/course.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fileUrl!: string;

  @Column()
  courseId: number;

  @Column({ nullable: true })
  uploadedById: number | null;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Course, (course) => course.resources)
  course: Course;

  @ManyToOne(() => User, (user) => user.resources, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'uploadedById' })
  uploadedBy: User;
}
