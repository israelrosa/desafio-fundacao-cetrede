import { type State } from "@/interfaces/states";

export interface StatesQuery {
  search?: string;
  sorts?: string;
  city_id?: number;
  region?: string;
}

export default async function getStates(query: StatesQuery): Promise<State[]> {
  const queryUrl = new URLSearchParams();

  Object.keys(query).forEach((key) => {
    if (query[key as keyof StatesQuery]) {
      queryUrl.set(key, `${query[key as keyof StatesQuery]}`);
    }
  });

  const response = await fetch(
    `http://localhost:3001/states?${queryUrl.toString()}`,
  );

  const states = await response.json();
  return states;
}
