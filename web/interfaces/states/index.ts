import { type City } from "../cities";

export interface State {
  id: number;
  name: string;
  abbreviation: string;
  region: string;
  cities: City[];
}
