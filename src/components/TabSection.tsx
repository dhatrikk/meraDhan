import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";

export default function TabsSection({
  showCalendar,
  setShowCalendar,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: any) {
  const [activeTab, setActiveTab] = useState("today");

  const clean = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const handleYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    setStartDate(clean(d));
    setEndDate(clean(d));
  };

  const handleToday = () => {
    const d = new Date();
    setStartDate(clean(d));
    setEndDate(clean(d));
  };

  const handleTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setStartDate(clean(d));
    setEndDate(clean(d));
  };

  const handleThisWeek = () => {
    const now = new Date();
    const day = now.getDay();
    const start = new Date(now);
    start.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    setStartDate(clean(start));
    setEndDate(clean(end));
  };

  const handleNextWeek = () => {
    const now = new Date();
    const day = now.getDay();
    const start = new Date(now);
    start.setDate(now.getDate() + (day === 0 ? 1 : 8 - day));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    setStartDate(clean(start));
    setEndDate(clean(end));
  };

  const handleThisMonth = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartDate(clean(start));
    setEndDate(clean(end));
  };

  // ACTIVE BUTTON STYLING
  const tabClass = (tab: string) =>
  activeTab === tab
    ? "px-6 py-3 bg-[#08224E] text-white rounded-2xl font-semibold whitespace-nowrap shadow-sm"
    : "px-6 py-3 text-gray-600 hover:text-black rounded-2xl transition whitespace-nowrap";


  return (
    <div className="mt-6 w-full ">
      <div className="bg-blue-50 rounded-xl flex items-center justify-between px-3 md:px-6  overflow-x-auto ">
        <div className="flex gap-3 md:gap-3 text-sm font-medium min-w-max">

          <button onClick={() => { handleYesterday(); setActiveTab("yesterday"); }} className={tabClass("yesterday")}>
            Yesterday
          </button>

          <button onClick={() => { handleToday(); setActiveTab("today"); }} className={tabClass("today")}>
            Today
          </button>

          <button onClick={() => { handleTomorrow(); setActiveTab("tomorrow"); }} className={tabClass("tomorrow")}>
            Tomorrow
          </button>

          <button onClick={() => { handleThisWeek(); setActiveTab("thisWeek"); }} className={tabClass("thisWeek")}>
            This Week
          </button>

          <button onClick={() => { handleNextWeek(); setActiveTab("nextWeek"); }} className={tabClass("nextWeek")}>
            Next Week
          </button>

          <button onClick={() => { handleThisMonth(); setActiveTab("thisMonth"); }} className={tabClass("thisMonth")}>
            This Month
          </button>
        </div>

        <button className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition">
          <FaFilter className="w-4 h-4 text-blue-900" />
          Filters
        </button>
      </div>

      {/* Mobile Buttons */}
      <div className="mt-3 md:hidden flex justify-between items-center px-3">
        <button className="flex items-center gap-2 border p-2 rounded-md text-sm">
          <FaFilter className="text-blue-950" />
          Filters
        </button>

        <button
          className="flex items-center gap-2 border p-2 rounded-md text-sm"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <FaCalendarDay className="text-blue-950 my-1" />
        </button>
      </div>
    </div>
  );
}


