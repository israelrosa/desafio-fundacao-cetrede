import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'escolas' })
export class School {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'no_escola', nullable: false })
  name: string;

  @Column({ name: 'tp_capital', nullable: false })
  capital_type: string;

  @Column({ name: 'tp_localizacao', nullable: false })
  location_type: string;

  @Column({ name: 'tp_tipo_rede', nullable: false })
  network_type: string;

  @Column({ name: 'municipio_id', nullable: false })
  city_id: number;
}
