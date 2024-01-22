import { type School } from "@/interfaces/schools";

export default async function getSchoolById(id: string): Promise<School> {
  const response = await fetch(`http://localhost:3001/schools/${id}`);
  const school = await response.json();
  return school;
}
