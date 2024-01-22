import { type School } from "@/interfaces/schools";

export default async function getSchoolById(id: string): Promise<School> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schools/${id}`,
  );
  const school = await response.json();
  return school;
}
