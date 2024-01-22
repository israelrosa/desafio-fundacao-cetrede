import { type InseRecord } from "@/interfaces/inse-records";
import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";

export interface InseRecordQuery {
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
  region?: string;
}

export default async function getInseRecords(
  query: InseRecordQuery,
): Promise<TypeOrmPaginationTemplate<InseRecord>> {
  const queryUrl = new URLSearchParams();

  Object.keys(query).forEach((key) => {
    if (query[key as keyof InseRecordQuery]) {
      queryUrl.set(key, `${query[key as keyof InseRecordQuery]}`);
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/inse-records?${queryUrl.toString()}`,
  );

  const inseRecords = await response.json();
  return inseRecords;
}
