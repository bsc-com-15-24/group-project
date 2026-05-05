// ================= ENTITY =================
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user-entity';

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    fileUrl?: string;

    @Column()
    courseId: number;

    @Column()
    uploadedById: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Course, (course) =>
        course.resources)
    course: Course;

    @ManyToOne(() => User, (user) => user.resources)
    uploadedBy: User;
}