import { City } from 'src/modules/cities/entities/city.entity';
import { InseRecord } from 'src/modules/inse-records/entities/inse-record.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'escolas' })
export class School {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  name: string;

  @Column({ name: 'tipo_capital', nullable: false })
  capital_type: number;

  @Column({ name: 'tipo_localizacao', nullable: false })
  location_type: number;

  @Column({ name: 'tipo_rede', nullable: false })
  network_type: number;

  @Column({ name: 'municipio_id', nullable: false })
  city_id: number;

  @ManyToOne(() => City, (city) => city.schools)
  @JoinColumn({ name: 'municipio_id' })
  city: City;

  @OneToMany(() => InseRecord, (inse_record) => inse_record.school)
  inse_records: InseRecord[];
}
