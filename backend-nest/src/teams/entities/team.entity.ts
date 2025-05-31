import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface TeamMember {
  name: string;
  position: string;
}

export enum TeamStatus {
  AVAILABLE = 'available',
  IN_PROJECT = 'in_project',
  ON_BREAK = 'on_break',
}

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  members: TeamMember[];

  @Column('simple-array')
  techStack: string[];

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    default: TeamStatus.AVAILABLE,
    enum: TeamStatus,
  })
  status: TeamStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
