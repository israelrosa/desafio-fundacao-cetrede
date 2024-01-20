import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
