import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';
import { Inse2021Seeder } from './seeders/inse-2021.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, Inse2021Seeder);
  }
}
