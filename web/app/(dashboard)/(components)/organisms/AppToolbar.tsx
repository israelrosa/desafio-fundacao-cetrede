import Search from "@/components/atoms/Search";
import { Dropdown } from "primereact/dropdown";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import CityDropdown from "../atoms/CityDropdown";
import StateDropdown from "../atoms/StateDropdown";
import { type InseRecordQuery } from "../../services/get-inse-records";

export interface AppToolbarProps {
  queries: InseRecordQuery;
  onChange: (queries: InseRecordQuery) => void;
}

export default function AppToolbar({
  queries,
  onChange,
}: AppToolbarProps): React.ReactNode {
  const locationTypes = [
    { name: "Urbana", code: 1 },
    { name: "Rural", code: 2 },
  ];

  const networkTypes = [
    { name: "Federal", code: 1 },
    { name: "Estadual", code: 2 },
    { name: "Municipal", code: 3 },
  ];

  const capitalTypes = [
    { name: "Capital", code: 1 },
    { name: "Interior", code: 2 },
  ];

  const regionTypes = [
    { name: "Norte", code: "N" },
    { name: "Nordeste", code: "NE" },
    { name: "Centro-Oeste", code: "CO" },
    { name: "Sudeste", code: "SE" },
    { name: "Sul", code: "S" },
  ];

  const handleQueriesChange = (event: any, key: string): void => {
    event.preventDefault();

    const queriesCopy = { ...queries };
    queriesCopy[key as keyof InseRecordQuery] =
      event.value || event.target.value;

    onChange(queriesCopy);
  };

  const startContent = (
    <Search
      onChange={(e) => {
        handleQueriesChange(e, "search");
      }}
      placeholder="Buscar registros"
    />
  );

  const endContent = (
    <>
      <Dropdown
        value={queries.location_type}
        placeholder="Localização"
        optionLabel="name"
        optionValue="code"
        options={locationTypes}
        onChange={(e) => {
          handleQueriesChange(e, "location_type");
        }}
        showClear
        className="mr-2"
      />
      <Dropdown
        value={queries.network_type}
        placeholder="Tipo de rede"
        optionLabel="name"
        optionValue="code"
        options={networkTypes}
        onChange={(e) => {
          handleQueriesChange(e, "network_type");
        }}
        showClear
        className="mr-2"
      />
      <Dropdown
        value={queries.capital_type}
        placeholder="Capital"
        optionLabel="name"
        optionValue="code"
        options={capitalTypes}
        onChange={(e) => {
          handleQueriesChange(e, "capital_type");
        }}
        showClear
        className="mr-2"
      />
      <Dropdown
        value={queries.region}
        placeholder="Região"
        optionLabel="name"
        optionValue="code"
        options={regionTypes}
        onChange={(e) => {
          handleQueriesChange(e, "region");
        }}
        showClear
        className="mr-2"
      />
      <CityDropdown
        city={queries.city_id}
        stateId={queries.state_id}
        region={queries.region}
        onChange={(e) => {
          handleQueriesChange(e, "city_id");
        }}
        className="mr-2"
      />
      <StateDropdown
        state={queries.state_id}
        cityId={queries.city_id}
        region={queries.region}
        onChange={(e) => {
          handleQueriesChange(e, "state_id");
        }}
      />
    </>
  );

  return (
    <Toolbar
      className="px-10 rounded-none"
      start={startContent}
      end={endContent}
    />
  );
}
