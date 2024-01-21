import { School } from 'src/modules/schools/entities/school.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'inse_registros' })
export class InseRecord {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column({ name: 'ano_saeb', nullable: false })
  year: number;

  @Column({ name: 'quantidade_alunos', nullable: false })
  students_quantity: number;

  @Column({ name: 'classificacao', nullable: false })
  classification: string;

  @Column('numeric', { name: 'media', nullable: false })
  average: number;

  @Column('numeric', { name: 'pc_nivel_1', nullable: false })
  percentual_level_1: number;

  @Column('numeric', { name: 'pc_nivel_2', nullable: false })
  percentual_level_2: number;

  @Column('numeric', { name: 'pc_nivel_3', nullable: false })
  percentual_level_3: number;

  @Column('numeric', { name: 'pc_nivel_4', nullable: false })
  percentual_level_4: number;

  @Column('numeric', { name: 'pc_nivel_5', nullable: false })
  percentual_level_5: number;

  @Column('numeric', { name: 'pc_nivel_6', nullable: false })
  percentual_level_6: number;

  @Column('numeric', { name: 'pc_nivel_7', nullable: false })
  percentual_level_7: number;

  @Column('numeric', { name: 'pc_nivel_8', nullable: false })
  percentual_level_8: number;

  @Column({ name: 'escola_id', nullable: false })
  school_id: number;

  @ManyToOne(() => School, (school) => school.inse_records)
  @JoinColumn({ name: 'escola_id' })
  school: School;
}
