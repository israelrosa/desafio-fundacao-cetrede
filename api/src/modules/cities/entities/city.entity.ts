import { School } from 'src/modules/schools/entities/school.entity';
import { State } from 'src/modules/states/entities/state.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'municipios' })
export class City {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', nullable: false })
  name: string;

  @Column({ name: 'estado_id', nullable: false })
  state_id: number;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'estado_id' })
  state: State;

  @OneToMany(() => School, (school) => school.city)
  schools: School[];
}
