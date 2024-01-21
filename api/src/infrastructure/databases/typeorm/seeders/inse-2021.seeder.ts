import { DataSource, QueryRunner } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as xlsx from 'xlsx';
import { join } from 'path';
import { logger } from '../../../../shared/utils/logger';
import { State } from '@/modules/states/entities/state.entity';
import { City } from '@/modules/cities/entities/city.entity';
import { School } from '@/modules/schools/entities/school.entity';
import { InseRecord } from '@/modules/inse-records/entities/inse-record.entity';
import { Seeder as SeederEntity } from '@/shared/providers/seeders/entities/seeder.entity';

interface IINSERecord {
  NU_ANO_SAEB: number;
  CO_UF: number;
  SG_UF: string;
  NO_UF: string;
  CO_MUNICIPIO: number;
  NO_MUNICIPIO: string;
  ID_ESCOLA: number;
  NO_ESCOLA: string;
  TP_TIPO_REDE: number;
  TP_LOCALIZACAO: number;
  TP_CAPITAL: number;
  QTD_ALUNOS_INSE: number;
  MEDIA_INSE: number;
  INSE_CLASSIFICACAO: string;
  PC_NIVEL_1: number;
  PC_NIVEL_2: number;
  PC_NIVEL_3: number;
  PC_NIVEL_4: number;
  PC_NIVEL_5: number;
  PC_NIVEL_6: number;
  PC_NIVEL_7: number;
  PC_NIVEL_8: number;
}

const regions = {
  N: ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
  NE: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  CO: ['DF', 'GO', 'MS', 'MT'],
  SE: ['ES', 'MG', 'RJ', 'SP'],
  S: ['PR', 'RS', 'SC'],
};

export class Inse2021Seeder implements Seeder {
  private queryRunner: QueryRunner;

  private states: State[] = [];

  private cities: City[] = [];

  private schools: School[] = [];

  private inseRecords: InseRecord[] = [];

  async run(dataSource: DataSource): Promise<void> {
    logger.info('Running Inse2021Seeder...');

    this.queryRunner = dataSource.createQueryRunner();

    const records = this.xlsxToJson();

    if (await this.verifyIfSeederAlreadyRunned()) {
      return;
    }

    await this.queryRunner.startTransaction();

    try {
      records.forEach((record) => {
        this.createState(record);
        this.createCity(record);
        this.createSchool(record);
        this.createInseRecord(record);
      });

      await this.queryRunner.manager.save(this.states);
      await this.queryRunner.manager.save(this.cities);
      await this.queryRunner.manager.save(this.schools, { chunk: 1000 });
      await this.queryRunner.manager.save(this.inseRecords, { chunk: 1000 });
      await this.recordSeeder();

      await this.queryRunner.commitTransaction();

      logger.info('Inse2021Seeder runned successfully!');
    } catch (error) {
      logger.error('Error running Inse2021Seeder...');
      console.log(error);

      await this.queryRunner.rollbackTransaction();
    } finally {
      await this.queryRunner.release();
    }
  }

  xlsxToJson(): IINSERecord[] {
    const file = xlsx.readFile(
      join(__dirname, '../../../../../assets/INSE_2021_escolas_1.xlsx'),
    );

    const sheetNameWithRecords = file.SheetNames[0];

    return xlsx.utils.sheet_to_json(file.Sheets[sheetNameWithRecords]);
  }

  async verifyIfSeederAlreadyRunned(): Promise<boolean> {
    const seeder = await this.queryRunner.manager.findOne(SeederEntity, {
      where: { name: 'Inse2021Seeder' },
    });

    if (seeder) {
      logger.info('Seeder already runned');
    }

    return !!seeder;
  }

  createState(record: IINSERecord): void {
    if (
      !this.states.some(
        (state) =>
          state.id === record.CO_UF || state.abbreviation === record.SG_UF,
      )
    ) {
      logger.info(`Creating state ${record.NO_UF}`);
      const findedRegion = Object.keys(regions).find((key) =>
        regions[key].includes(record.SG_UF),
      );

      const state = this.queryRunner.manager.create(State, {
        abbreviation: record.SG_UF,
        name: record.NO_UF,
        id: record.CO_UF,
        region: findedRegion,
      });

      this.states.push(state);
    }
  }

  createCity(record: IINSERecord): void {
    if (!this.cities.some((city) => city.id === record.CO_MUNICIPIO)) {
      const city = this.queryRunner.manager.create(City, {
        id: record.CO_MUNICIPIO,
        name: record.NO_MUNICIPIO,
        state_id: this.states.find(
          (state) => state.abbreviation === record.SG_UF,
        )?.id,
      });

      this.cities.push(city);
    }
  }

  createSchool(record: IINSERecord): void {
    if (!this.schools.some((school) => school.id === record.ID_ESCOLA)) {
      const school = this.queryRunner.manager.create(School, {
        id: record.ID_ESCOLA,
        name: record.NO_ESCOLA,
        capital_type: record.TP_CAPITAL,
        city_id: record.CO_MUNICIPIO,
        location_type: record.TP_LOCALIZACAO,
        network_type: record.TP_TIPO_REDE,
      });

      this.schools.push(school);
    }
  }

  createInseRecord(record: IINSERecord): void {
    const inseRecord = this.queryRunner.manager.create(InseRecord, {
      school_id: record.ID_ESCOLA,
      year: record.NU_ANO_SAEB,
      students_quantity: record.QTD_ALUNOS_INSE,
      average: record.MEDIA_INSE,
      classification: record.INSE_CLASSIFICACAO,
      percentual_level_1: record.PC_NIVEL_1,
      percentual_level_2: record.PC_NIVEL_2,
      percentual_level_3: record.PC_NIVEL_3,
      percentual_level_4: record.PC_NIVEL_4,
      percentual_level_5: record.PC_NIVEL_5,
      percentual_level_6: record.PC_NIVEL_6,
      percentual_level_7: record.PC_NIVEL_7,
      percentual_level_8: record.PC_NIVEL_8,
    });

    this.inseRecords.push(inseRecord);
  }

  async recordSeeder(): Promise<void> {
    const seeder = this.queryRunner.manager.create(SeederEntity, {
      name: 'Inse2021Seeder',
    });

    await this.queryRunner.manager.save(seeder);
  }
}
