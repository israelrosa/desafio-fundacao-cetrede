import { type School } from "../schools";
import { type State } from "../states";

export interface City {
  id: number;
  name: string;
  state_id: number;
  state: State;
  schools?: School[];
}
