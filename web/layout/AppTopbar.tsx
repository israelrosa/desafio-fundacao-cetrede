/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { Toolbar } from 'primereact/toolbar';
import React from 'react';

function AppTopbar(): React.ReactNode {
  const startContent = (
    <Image src='/assets/gov.png' alt='gov_logo' width={80} height={100} />
  )
  
  return (
    <Toolbar start={startContent} />
  );
}

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;