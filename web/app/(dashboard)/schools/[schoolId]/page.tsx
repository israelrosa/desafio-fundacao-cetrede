"use client";

import React, { useCallback, useEffect, useState } from "react";
// import { Card } from "primereact/card";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import Search from "@/components/atoms/Search";
// import { type InseRecord } from "@/interfaces/inse-records";
// import { type TypeOrmPaginationTemplate } from "@/interfaces/utils/typeormPaginationTemplate";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import { type School } from "@/interfaces/schools";
import { Chip } from "primereact/chip";
import {
  CAPITAL_TYPES,
  LOCATION_TYPES,
  NETWORK_TYPES,
} from "@/utils/constants";
import Link from "next/link";
import getSchoolById from "./services/get-school-by-id";
import BarChart from "../../(components)/organisms/Cards/BarChartCard";
import TextValueCard from "../../(components)/organisms/Cards/TextValueCard";
import RadarChartCard from "../../(components)/organisms/Cards/RadarChartCard";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function SchoolPage({
  params,
}: {
  params: { schoolId: string };
}): React.ReactNode {
  const [school, setSchool] = useState<School>();
  const [percentLevels, setPercentLevels] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  const [layouts, setLayout] = useState<Layouts>({});

  const handleFillPercentLevelsData = (schoolData: School): void => {
    if (schoolData.inse_records && schoolData.inse_records.length > 0) {
      const labels = [
        "Nível 1",
        "Nível 2",
        "Nível 3",
        "Nível 4",
        "Nível 5",
        "Nível 6",
        "Nível 7",
        "Nível 8",
      ];
      const data = [
        schoolData.inse_records[0].percentual_level_1,
        schoolData.inse_records[0].percentual_level_2,
        schoolData.inse_records[0].percentual_level_3,
        schoolData.inse_records[0].percentual_level_4,
        schoolData.inse_records[0].percentual_level_5,
        schoolData.inse_records[0].percentual_level_6,
        schoolData.inse_records[0].percentual_level_7,
        schoolData.inse_records[0].percentual_level_8,
      ];

      setPercentLevels({
        labels,
        data,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getSchoolById(params.schoolId);

      setSchool(data);
      handleFillPercentLevelsData(data);
    })();
  }, [params.schoolId]);

  const handleLayoutChange = useCallback(() => {
    setLayout({
      lg: [
        { w: 2, h: 3, x: 0, y: 0, i: "StudentsTextValueCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsAverageCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "ClassificationCard" },
        { w: 6, h: 7, x: 0, y: 3, i: "BarChartCard" },
        { w: 6, h: 7, x: 4, y: 3, i: "RadarChartCard" },
      ],

      md: [
        { w: 2, h: 3, x: 0, y: 0, i: "StudentsTextValueCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsAverageCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "ClassificationCard" },
        { w: 6, h: 7, x: 0, y: 3, i: "BarChartCard" },
        { w: 6, h: 7, x: 4, y: 3, i: "RadarChartCard" },
      ],
      sm: [
        { w: 2, h: 3, x: 0, y: 0, i: "StudentsTextValueCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsAverageCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "ClassificationCard" },
        { w: 6, h: 7, x: 0, y: 3, i: "BarChartCard" },
        { w: 6, h: 7, x: 4, y: 3, i: "RadarChartCard" },
      ],
      xs: [
        { w: 2, h: 3, x: 0, y: 0, i: "StudentsTextValueCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsAverageCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "ClassificationCard" },
        { w: 6, h: 7, x: 0, y: 3, i: "BarChartCard" },
        { w: 6, h: 7, x: 4, y: 3, i: "RadarChartCard" },
      ],
      xxs: [
        { w: 2, h: 3, x: 0, y: 0, i: "StudentsTextValueCard" },
        { w: 2, h: 3, x: 2, y: 0, i: "StudentsAverageCard" },
        { w: 2, h: 3, x: 4, y: 0, i: "ClassificationCard" },
        { w: 6, h: 7, x: 0, y: 3, i: "BarChartCard" },
        { w: 6, h: 7, x: 4, y: 3, i: "RadarChartCard" },
      ],
    });
  }, []);

  const chipsRender = (): React.ReactNode => {
    const LocationType = school?.location_type
      ? LOCATION_TYPES[school.location_type]
      : "";

    const NetworkType = school?.network_type
      ? NETWORK_TYPES[school.network_type]
      : "";
    const CapitalType = school?.capital_type
      ? CAPITAL_TYPES[school.capital_type]
      : "";

    return (
      <div className="flex">
        <Chip
          className="mr-2"
          label={school?.city.name}
          icon="pi pi-map-marker"
        />
        <Chip
          className="mr-2"
          label={school?.city.state.name}
          icon="pi pi-map"
        />
        <Chip className="mr-2" label={LocationType} icon="pi pi-building" />
        <Chip className="mr-2" label={NetworkType} icon="pi pi-star" />
        <Chip className="mr-2" label={CapitalType} icon="pi pi-compass" />
      </div>
    );
  };

  return (
    <div className="p-12 w-full h-full">
      <div className="flex flex-1 items-center mb-8">
        <Link href="/">
          <span className="pi pi-arrow-left mr-3" />
        </Link>
        <div className="pl-3 ">
          <h1 className="font-semibold">{school?.name}</h1>
          {chipsRender()}
        </div>
      </div>
      <ResponsiveGridLayout
        className="h-dvh"
        layouts={layouts}
        cols={{ lg: 6, md: 5, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={40}
        onLayoutChange={handleLayoutChange}
      >
        <div key="StudentsTextValueCard">
          <TextValueCard
            title="Quantidade de Alunos"
            value={school?.inse_records?.[0].students_quantity}
          />
        </div>
        <div key="StudentsAverageCard">
          <TextValueCard
            title="Média dos Alunos"
            value={school?.inse_records?.[0].average}
          />
        </div>
        <div key="ClassificationCard">
          <TextValueCard
            title="Classificação dos Alunos"
            value={school?.inse_records?.[0].classification}
          />
        </div>
        {/* <div key="BarChartCard" style={{ border: "1px solid black" }} />
        <div key="InseRecordsCard" style={{ border: "1px solid black" }} />  */}
        <div key="BarChartCard">
          <BarChart
            title="Nível percentual por aluno"
            labels={percentLevels.labels}
            data={percentLevels.data}
          />
        </div>
        <div key="RadarChartCard">
          <RadarChartCard
            title="Percentual por aluno"
            labels={percentLevels.labels}
            data={percentLevels.data}
          />
        </div>
      </ResponsiveGridLayout>
      <div className="py-8" />
    </div>
  );
}
