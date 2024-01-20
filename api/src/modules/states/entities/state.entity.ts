import { City } from 'src/modules/cities/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estados' })
export class State {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', nullable: false })
  name: string;

  @Column({ name: 'sigla', nullable: false })
  abbreviation: string;

  @Column({ name: 'regiao', nullable: false })
  region: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
