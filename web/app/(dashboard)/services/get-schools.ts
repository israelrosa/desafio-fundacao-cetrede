import { type School } from "@/interfaces/schools";
import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";

export interface SchoolQuery {
  search?: string;
  page?: number;
  limit?: number;
  sorts?: string;
  classification?: string;
  capital_type?: number;
  location_type?: number;
  network_type?: number;
  state_id?: number;
  city_id?: number;
}

export default async function getSchools(
  query: SchoolQuery,
): Promise<TypeOrmPaginationTemplate<School>> {
  const queryUrl = new URLSearchParams();

  Object.keys(query).forEach((key) => {
    if (query[key as keyof SchoolQuery]) {
      queryUrl.set(key, `${query[key as keyof SchoolQuery]}`);
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schools?${queryUrl.toString()}`,
  );

  const schools = await response.json();
  return schools;
}
