'use client';
import React from 'react';
import CreateDenomination from './create-denomination';
import ViewDenomination from './view-denomination';

const Denomination = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <CreateDenomination />
      <ViewDenomination />
    </div>
  );
};

export default Denomination;
