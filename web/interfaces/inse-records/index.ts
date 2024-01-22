import { type School } from "../schools";

export interface InseRecord {
  id: number;
  year: number;
  students_quantity: number;
  classification: string;
  average: number;
  percentual_level_1: number;
  percentual_level_2: number;
  percentual_level_3: number;
  percentual_level_4: number;
  percentual_level_5: number;
  percentual_level_6: number;
  percentual_level_7: number;
  percentual_level_8: number;
  school_id: number;
  school: School;
}
