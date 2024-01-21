import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'seeder' })
export class Seeder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', nullable: false, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Date;
}
