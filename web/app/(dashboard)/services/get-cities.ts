import { type City } from "@/interfaces/cities";
import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";

export interface CitiesQuery {
  search?: string;
  page?: number;
  limit?: number;
  sorts?: string;
  state_id?: number;
  region?: string;
}

export default async function getCities(
  query: CitiesQuery,
): Promise<TypeOrmPaginationTemplate<City>> {
  const queryUrl = new URLSearchParams();

  Object.keys(query).forEach((key) => {
    if (query[key as keyof CitiesQuery]) {
      queryUrl.set(key, `${query[key as keyof CitiesQuery]}`);
    }
  });

  const response = await fetch(
    `http://localhost:3001/cities?${queryUrl.toString()}`,
  );

  const cities = await response.json();
  return cities;
}
