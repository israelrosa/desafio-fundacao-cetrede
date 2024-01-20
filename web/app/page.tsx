import React from 'react'
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Home (): React.ReactNode {  
  return (
    <main>
      <div className='flex p-6'>
        <Card title="INSE 2021">
          <DataTable value={[]}>
            <Column field="name" header="Name" />
            <Column field="age" header="Age" />
          </DataTable>
        </Card>
      </div>
    </main>
  )
}
