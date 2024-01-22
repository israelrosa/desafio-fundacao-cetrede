"use client";

import getStates from "@/app/(dashboard)/services/get-states";
import { type State } from "@/interfaces/states";
import { Dropdown, type DropdownProps } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

export interface StateDropdownProps extends DropdownProps {
  state: number | undefined;
  cityId: number | undefined;
  region: string | undefined;
}

export default function StateDropdown({
  state,
  cityId,
  region,
  ...rest
}: StateDropdownProps): React.ReactNode {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      const data = await getStates({
        ...{ city_id: cityId },
        ...(region && { region }),
      });
      setStates(data);
    })();
  }, [cityId, region]);

  return (
    <Dropdown
      value={state}
      options={states}
      placeholder="Estado"
      optionLabel="name"
      optionValue="id"
      showClear
      {...rest}
    />
  );
}
