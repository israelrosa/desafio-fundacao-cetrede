import { City } from 'src/modules/cities/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'estados' })
export class State {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  name: string;

  @Column({ name: 'sigla', nullable: false, unique: true })
  abbreviation: string;

  @Column({ name: 'regiao', nullable: false })
  region: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
