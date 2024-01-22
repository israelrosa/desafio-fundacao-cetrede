import Search from "@/components/atoms/Search";
import { type School } from "@/interfaces/schools";
import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable, DataTableSortMeta } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { type SchoolQuery } from "../../services/get-schools";
import { Paginator } from "primereact/paginator";
import { useRouter } from "next/navigation";
import {
  CAPITAL_TYPES,
  LOCATION_TYPES,
  NETWORK_TYPES,
} from "@/utils/constants";
import { Chip } from "primereact/chip";

export interface SchoolsTableProps {
  schools: TypeOrmPaginationTemplate<School> | undefined;
  queries: SchoolQuery;
  onChange: (queries: SchoolQuery) => void;
}

export default function SchoolsTable({
  onChange,
  queries,
  schools,
}: SchoolsTableProps): React.ReactNode {
  const router = useRouter();
  const [sortMeta, setSortMeta] = useState<DataTableSortMeta[]>([]);

  useEffect(() => {
    const sorts = queries.sorts?.split(",").map((sort) => {
      const [field, order] = sort.split(":");
      return { field, order: order === "asc" ? 1 : -1 };
    });

    if (!sorts) return;
    setSortMeta(sorts as DataTableSortMeta[]);
  }, [queries.sorts]);

  const handleQueriesChange = (event: any, key: string): void => {
    event.preventDefault();

    const queriesCopy = { ...queries };
    queriesCopy[key as keyof SchoolQuery] = event.value || event.target.value;

    onChange(queriesCopy);
  };

  const handleSort = async (e: any) => {
    const queriesCopy = { ...queries };

    queriesCopy.sorts = e.multiSortMeta
      .map((sort: any) => {
        return `${sort.field}:${sort.order === 1 ? "asc" : "desc"}`;
      })
      .join(",");

    onChange(queriesCopy);
  };

  const onPageChange = (e: any) => {
    const queriesCopy = { ...queries };

    queriesCopy.page = e.page + 1;
    queriesCopy.limit = e.rows;

    onChange(queriesCopy);
  };

  const handleRowClick = (e: any) => {
    router.push(`/schools/${e.data.id}`);
  };

  const capitalTypeTemplate = (school: School): React.ReactNode => {
    const CapitalType = school?.capital_type
      ? CAPITAL_TYPES[school.capital_type]
      : "";

    return <Chip className="mr-2" label={CapitalType} icon="pi pi-compass" />;
  };
  const locationTypeTemplate = (school: School): React.ReactNode => {
    const LocationType = school?.location_type
      ? LOCATION_TYPES[school.location_type]
      : "";

    return (
      <div className="flex">
        <Chip className="mr-2" label={LocationType} icon="pi pi-building" />
      </div>
    );
  };
  const networkTypeTemplate = (school: School): React.ReactNode => {
    const NetworkType = school?.network_type
      ? NETWORK_TYPES[school.network_type]
      : "";

    return (
      <div className="flex">
        <Chip className="mr-2" label={NetworkType} icon="pi pi-star" />
      </div>
    );
  };

  return (
    <Card className="flex-1 h-full overflow-hidden" title="Escolas cadastradas">
      <Search
        onChange={(e) => {
          handleQueriesChange(e, "search");
        }}
        value={queries.search}
        className="mb-3"
        placeholder="Buscar por escola"
      />
      <DataTable
        value={schools?.data}
        sortMode="multiple"
        multiSortMeta={sortMeta}
        onSort={handleSort}
        resizableColumns
        rowHover
        rowClassName={() => "cursor-pointer active:bg-slate-200"}
        onRowDoubleClick={handleRowClick}
      >
        <Column field="name" header="Escola" sortable />
        <Column
          field="capital_type"
          header="Zona"
          body={capitalTypeTemplate}
          sortable
        />
        <Column
          field="network_type"
          header="Tipo de Rede"
          body={networkTypeTemplate}
          sortable
        />
        <Column
          field="location_type"
          header="Tipo de local"
          body={locationTypeTemplate}
          sortable
        />
      </DataTable>
      <Paginator
        first={
          ((schools?.meta.current_page || 0) - 1) *
          (schools?.meta.per_page || 0)
        }
        rows={5}
        totalRecords={schools?.meta.total || 0}
        rowsPerPageOptions={[5, 10]}
        onPageChange={onPageChange}
      />
    </Card>
  );
}
