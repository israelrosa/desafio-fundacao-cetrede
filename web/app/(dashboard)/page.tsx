"use client";

import React, { useCallback, useEffect, useState } from "react";
import { type InseRecord } from "@/interfaces/inse-records";
import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import { InputSwitch } from "primereact/inputswitch";
import { type School } from "@/interfaces/schools";
import BarChart from "./(components)/organisms/Cards/BarChartCard";
import CounterCard from "./(components)/organisms/Cards/TextValueCard";
import getInseRecords, {
  type InseRecordQuery,
} from "./services/get-inse-records";
import AppToolbar from "./(components)/organisms/AppToolbar";
import getSchools, { type SchoolQuery } from "./services/get-schools";
import SchoolsTable from "./(components)/organisms/SchoolsTable";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home(): React.ReactNode {
  const [queries, setQueries] = useState<InseRecordQuery>({
    page: 1,
    limit: 10,
  });

  const [schoolQueries, setSchoolQueries] = useState<SchoolQuery>({
    page: 1,
    limit: 5,
  });

  const [gridEditMode, setGridEditMode] = useState<boolean>(false);
  const [layouts, setLayout] = useState<Layouts>({});
  const [results, setResults] =
    useState<TypeOrmPaginationTemplate<InseRecord>>();
  const [schools, setSchools] = useState<TypeOrmPaginationTemplate<School>>();

  useEffect(() => {
    (async (): Promise<void> => {
      const inseRecords = await getInseRecords(queries);
      setResults(inseRecords);
    })();
  }, [queries]);

  useEffect(() => {
    (async (): Promise<void> => {
      const schoolsData = await getSchools({
        page: schoolQueries.page,
        limit: schoolQueries.limit,
        ...queries,
        ...schoolQueries,
      });

      setSchools(schoolsData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolQueries, queries]);

  const handleLayoutChange = useCallback(() => {
    setLayout({
      lg: [
        { w: 2, h: 3, x: 0, y: 0, i: "SchoolsCounterCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsCounterCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "AverageCounterCard" },
        { w: 3, h: 5, x: 0, y: 3, i: "SchoolsPerClassificationBarChartCard" },
        { w: 3, h: 5, x: 3, y: 3, i: "StudentsPercentagePerLevelChartCard" },
        { w: 6, h: 12, x: 0, y: 7, i: "SchoolsCard" },
      ],
      md: [
        { w: 2, h: 3, x: 0, y: 0, i: "SchoolsCounterCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsCounterCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "AverageCounterCard" },
        { w: 3, h: 5, x: 0, y: 3, i: "SchoolsPerClassificationBarChartCard" },
        { w: 3, h: 5, x: 3, y: 3, i: "StudentsPercentagePerLevelChartCard" },
        { w: 6, h: 12, x: 0, y: 7, i: "SchoolsCard" },
      ],
      sm: [
        { w: 1, h: 3, x: 0, y: 0, i: "SchoolsCounterCard" },
        { w: 1, h: 3, x: 1, y: 0, i: "StudentsCounterCard" },
        { w: 1, h: 3, x: 3, y: 0, i: "AverageCounterCard" },
        { w: 3, h: 5, x: 0, y: 3, i: "SchoolsPerClassificationBarChartCard" },
        { w: 3, h: 5, x: 3, y: 3, i: "StudentsPercentagePerLevelChartCard" },
        { w: 6, h: 13, x: 0, y: 7, i: "SchoolsCard" },
      ],
      xs: [
        { w: 1, h: 3, x: 0, y: 0, i: "SchoolsCounterCard" },
        { w: 1, h: 3, x: 1, y: 0, i: "StudentsCounterCard" },
        { w: 6, h: 3, x: 0, y: 3, i: "AverageCounterCard" },
        { w: 3, h: 5, x: 0, y: 3, i: "SchoolsPerClassificationBarChartCard" },
        { w: 3, h: 5, x: 3, y: 3, i: "StudentsPercentagePerLevelChartCard" },
        { w: 6, h: 13, x: 0, y: 7, i: "SchoolsCard" },
      ],
      xxs: [
        { w: 1, h: 3, x: 0, y: 0, i: "SchoolsCounterCard" },
        { w: 2, h: 3, x: 1, y: 0, i: "StudentsCounterCard" },
        { w: 6, h: 3, x: 0, y: 3, i: "AverageCounterCard" },
        { w: 3, h: 5, x: 0, y: 3, i: "SchoolsPerClassificationBarChartCard" },
        { w: 3, h: 5, x: 3, y: 3, i: "StudentsPercentagePerLevelChartCard" },
        { w: 6, h: 13, x: 0, y: 7, i: "SchoolsCard" },
      ],
    });
  }, []);

  const handleQueriesChange = async (
    queriesData: InseRecordQuery,
  ): Promise<void> => {
    setQueries(queriesData);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <AppToolbar
        queries={queries}
        onChange={(queriesData) => {
          handleQueriesChange(queriesData);
        }}
      />
      <div className="w-full h-full overflow-auto">
        <div className="flex flex-1 pt-8 px-10 items-center justify-between">
          <span className="text-3xl">INSE 2021</span>
          <div className="flex items-center">
            <span className="mr-3 text-xs">Modo editor</span>
            <InputSwitch
              checked={gridEditMode}
              onChange={(e) => {
                setGridEditMode(e.value);
              }}
            />
          </div>
        </div>

        <ResponsiveGridLayout
          isDraggable={gridEditMode}
          isResizable={gridEditMode}
          className="p-8 h-dvh"
          layouts={layouts}
          cols={{ lg: 6, md: 5, sm: 3, xs: 2, xxs: 1 }}
          rowHeight={40}
          onLayoutChange={handleLayoutChange}
        >
          <div key="SchoolsCounterCard">
            <CounterCard
              title="Quantidade de Escolas"
              value={results?.meta.total}
            />
          </div>
          <div key="StudentsCounterCard">
            <CounterCard
              title="Quantidade de Alunos"
              value={results?.meta.info.students_count}
            />
          </div>
          <div key="AverageCounterCard">
            <CounterCard
              title="Média Geral"
              value={results?.meta.info.average}
            />
          </div>
          <div key="SchoolsPerClassificationBarChartCard">
            <BarChart
              title="Quantidade de escolas por classificação"
              data={results?.meta.info.number_of_schools_per_classification.map(
                ({ data }: { data: number }) => data,
              )}
              labels={results?.meta.info.number_of_schools_per_classification.map(
                ({ label }: { label: string }) => label,
              )}
            />
          </div>
          <div key="StudentsPercentagePerLevelChartCard">
            <BarChart
              title="Média dos alunos por nível"
              data={results?.meta.info.students_percentage_per_level.map(
                ({ data }: { data: number }) => data,
              )}
              labels={results?.meta.info.students_percentage_per_level.map(
                ({ label }: { label: string }) => label,
              )}
            />
          </div>
          <div key="SchoolsCard">
            <SchoolsTable
              schools={schools}
              queries={schoolQueries}
              onChange={setSchoolQueries}
            />
          </div>
        </ResponsiveGridLayout>
        <div className="py-8" />
      </div>
    </div>
  );
}
