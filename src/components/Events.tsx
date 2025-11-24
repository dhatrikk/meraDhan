"use client";
import ReactCountryFlag from "react-country-flag";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { EventItem, COUNTRY_MAP } from "@/utils/eventUtils";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Events({
  showCalendar,
  setShowCalendar,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: any) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Convert date → YYYY-MM-DD
  const formatDate = (date?: Date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`; // stays local date
  };

  // Fetch events whenever selectedDate changes
  useEffect(() => {
    const fetchEvents = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      try {
        const res = await fetch(
          `/api/events?start=${formatDate(startDate)}&end=${formatDate(
            endDate
          )}`
        );
        const data = await res.json();
        console.log(data);
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [startDate, endDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setStartDate(date || new Date());
    setEndDate(date || new Date());
  };

  const renderStars = (impact: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((n) =>
          n <= impact ? (
            <FaStar key={n} className="text-orange-500 w-4 h-4" />
          ) : (
            <FaRegStar key={n} className="text-orange-500 w-4 h-4" />
          )
        )}
      </div>
    );
  };

 return (
    <>
      {/* -------------------------------------------------- */}
      {/* TOP DATE HEADING */}
      {/* -------------------------------------------------- */}
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <h2 className="text-2xl font-semibold">
          {startDate &&
            startDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}

          {startDate &&
            endDate &&
            startDate.getTime() !== endDate.getTime() &&
            ` to ${endDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`}
        </h2>
      </div>

      {/* -------------------------------------------------- */}
      {/* GRID: TABLE LEFT (2fr), CALENDAR RIGHT (1fr) */}
      {/* -------------------------------------------------- */}
      <div className="max-w-7xl mx-auto mt-4  grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">

        {/* ---------------------------- */}
        {/* LEFT SIDE – TABLE + MOBILE */}
        {/* ---------------------------- */}
        <div className="md:col-span-1">

          {/* MOBILE CALENDAR */}
          {showCalendar && (
            <div className="md:hidden mb-4 rounded-2xl bg-gray-100 w-fit">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleDateSelect}
                captionLayout="dropdown"
                fromYear={2010}
                toYear={2035}
                showOutsideDays
                className="my-adaptive-calendar rounded-2xl border w-full shadow-sm"
              />
            </div>
          )}

          {/* DESKTOP TABLE */}
          <Card className="border-0 shadow-none hidden md:block">
            <CardContent className="p-0">
              <div className="rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">Time (IST)</th>
                      <th className="p-3">Country</th>
                      <th className="p-3">Event</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center">
                          Loading...
                        </td>
                      </tr>
                    )}

                    {!loading && events.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-gray-500">
                          No events for this date
                        </td>
                      </tr>
                    )}

                    {!loading &&
                      events.map((e: any, i: number) => (
                        <tr key={i} className="border-b">
                          <td className="p-3 text-sm">{e.time}</td>

                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <ReactCountryFlag
                                countryCode={COUNTRY_MAP[e.country] || ""}
                                svg
                                style={{
                                  width: "1.2em",
                                  height: "1em",
                                  border: "0.5px solid #d1d5db",
                                }}
                              />
                              <span className="text-sm font-medium">{e.country}</span>
                            </div>
                          </td>

                          <td className="p-3 text-sm font-medium">{e.event}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* MOBILE – CARD LIST */}
          <div className="md:hidden space-y-4 mt-4">
            {loading && <p className="text-center text-gray-600">Loading...</p>}

            {!loading && events.length === 0 && (
              <p className="text-center text-gray-500">No events for this date</p>
            )}

            {!loading &&
              events.map((e: any, i: number) => (
                <div key={i} className="border p-3 rounded-xl shadow-sm bg-white">
                  <div className="grid grid-cols-3 items-center mb-1">
                    <div className="text-sm font-semibold">{e.time}</div>

                    <div className="flex justify-center items-center gap-2">
                      <ReactCountryFlag
                        countryCode={COUNTRY_MAP[e.country] || ""}
                        svg
                        style={{
                          width: "1.2em",
                          height: "1em",
                          border: "0.5px solid #d1d5db",
                        }}
                      />
                      <span className="text-sm font-medium">{e.country}</span>
                    </div>

                    <div className="flex justify-end">{renderStars(e.impact)}</div>
                  </div>

                  <p className="font-semibold mt-1">{e.event}</p>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>ACT: {e.actual || "-"}</span>
                    <span>Cons: {e.consensus || "-"}</span>
                    <span>Prev: {e.previous || "-"}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ---------------------------- */}
        {/* RIGHT SIDE – CALENDAR DESKTOP */}
        {/* ---------------------------- */}
        <div className="hidden md:block mt-6 rounded-2xl bg-gray-100 h-fit  w-fit mx-auto">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
            fromYear={2010}
            toYear={2035}
            showOutsideDays
            className="my-adaptive-calendar rounded-2xl border shadow-sm"
          />
        </div>
      </div>
    </>
  );

}
