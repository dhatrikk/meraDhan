// Home.tsx
"use client";

import { useState } from "react";
import HeaderSection from "../components/HeaderSection";
import TabsSection from "../components/TabSection";
import Events from "../components/Events";

export default function Home() {

  const [showCalendar, setShowCalendar] = useState(false);

    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
        <div className="w-full md:p-25 p-20">
      <HeaderSection/>

      <TabsSection
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <Events
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </div>

  );
}
