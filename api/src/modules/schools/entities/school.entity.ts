import { City } from 'src/modules/cities/entities/city.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'escolas' })
export class School {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', nullable: false })
  name: string;

  @Column({ name: 'tipo_capital', nullable: false })
  capital_type: string;

  @Column({ name: 'tipo_localizacao', nullable: false })
  location_type: string;

  @Column({ name: 'tipo_rede', nullable: false })
  network_type: string;

  @Column({ name: 'municipio_id', nullable: false })
  city_id: number;

  @ManyToOne(() => City, (city) => city.schools)
  @JoinColumn({ name: 'municipio_id' })
  city: City;
}
