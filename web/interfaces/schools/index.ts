import { type City } from "../cities";
import { type InseRecord } from "../inse-records";

export type CapitalType = 1 | 2;
export type NetworkType = 1 | 2 | 3;
export type LocationType = 1 | 2;

export interface School {
  id: number;
  name: string;
  capital_type: CapitalType;
  location_type: LocationType;
  network_type: NetworkType;
  city_id: number;
  city: City;
  inse_records?: InseRecord[];
}
