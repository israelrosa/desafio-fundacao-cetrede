"use client";

import getCities from "@/app/(dashboard)/services/get-cities";
import { type City } from "@/interfaces/cities";
import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";
import { Dropdown, type DropdownProps } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

export interface CityDropdownProps extends DropdownProps {
  city: number | undefined;
  stateId: number | undefined;
  region: string | undefined;
}

export default function CityDropdown({
  city,
  stateId,
  region,
  ...rest
}: CityDropdownProps): React.ReactNode {
  const [cities, setCities] = useState<TypeOrmPaginationTemplate<City>>({
    data: [],
    meta: {
      current_page: 0,
      from: 0,
      last_page: 0,
      per_page: 0,
      to: 0,
      total: 0,
    },
  });

  useEffect(() => {
    (async (): Promise<void> => {
      const data = await getCities({
        ...(stateId && { state_id: stateId }),
        ...(region && { region }),
      });
      setCities(data);
    })();
  }, [stateId, region]);

  return (
    <Dropdown
      value={city}
      options={cities.data}
      optionLabel="name"
      optionValue="id"
      placeholder="Cidade"
      showClear
      virtualScrollerOptions={{ itemSize: 38 }}
      {...rest}
    />
  );
}
