import React from "react";

import {
  FindTotalCard,
  PercentOfCard,
  PercentageChangeCard,
  PercentageDifferenceCard,
  ValueChangeCard,
  WhatPercentCard,
} from "./calculator/cards";

const PercentageCalculator = () => {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-1.5 text-xs font-semibold text-white/80 shadow-lg shadow-black/15 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.55)]" />
          Quick percentage tools
        </div>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
          <span className="bg-gradient-to-r from-orange-200 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            Percento
          </span>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
          Six calculators side-by-side for instant answers.
        </p>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PercentOfCard />
        <WhatPercentCard />
        <PercentageChangeCard />
        <FindTotalCard />
        <PercentageDifferenceCard />
        <ValueChangeCard />
      </div>
    </div>
  );
};

export default PercentageCalculator;
