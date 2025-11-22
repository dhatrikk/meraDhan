"use client";
type EventItem = {
  time: string;
  country: string;
  flag?: string;
  impact: number;
  event: string;
  actual?: string;
  consensus?: string;
  previous?: string;
};

import ReactCountryFlag from "react-country-flag";

const COUNTRY_MAP: Record<string, string> = {
  USA: "US",
  IND: "IN",
  JPN: "JP",
  CHN: "CN",
  AUS: "AU",
  EUR: "EU",
  UK: "GB",
  CAN: "CA",
};

import { FaStar, FaRegStar, FaRegCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

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
      if (!selectedDate) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/events?date=${formatDate(selectedDate)}`);
        const data = await res.json();
        console.log(data);
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [selectedDate]);

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
    <div className=" md:pt-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT SIDE – EVENTS */}
      <div className="md:col-span-2">
        {/* Heading + Mobile Calendar Button */}
        <div className="flex justify-center items-center">
          <h2
            className="  text-center md:text-left text-center bg-gray-100 py-2 my-3 text-base w-full font-semibold md:text-2xl md:bg-transparent md:py-0"
          >
            {selectedDate?.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>

          {/* CALENDAR ICON - MOBILE */}
          <button
            className="md:hidden flex items-center gap-2 border px-3 py-2 -mt-25 rounded-md text-sm"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaRegCalendarAlt className="text-blue-900 my-1 " />
          </button>
        </div>

        {/* MOBILE CALENDAR DROPDOWN */}
        {showCalendar && (
          <div className="md:hidden mb-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              captionLayout="dropdown"
              fromYear={2010}
              toYear={2035}
              showOutsideDays
              className="rounded-xl border bg-white p-4 shadow-sm"
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
                    <th className="p-3">Time</th>
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
                              style={{ width: "1.2em", height: "1.2em" }}
                            />
                            <span className="text-sm font-medium">
                              {e.country}
                            </span>
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

        {/* MOBILE – CARD VIEW */}
        <div className="md:hidden space-y-4 mt-4">
          {loading && <p className="text-center text-gray-600">Loading...</p>}

          {!loading && events.length === 0 && (
            <p className="text-center text-gray-500">No events for this date</p>
          )}

          {!loading &&
            events.map((e: any, i: number) => (
              <div key={i} className="border p-3 rounded-xl shadow-sm bg-white">
                {/* TOP ROW */}
                <div className="grid grid-cols-3 items-center mb-1">
                  {/* TIME */}
                  <div className="text-sm font-semibold">{e.time}</div>

                  {/* COUNTRY CENTERED */}
                  <div className="flex justify-center items-center gap-2">
                    <ReactCountryFlag
                      countryCode={COUNTRY_MAP[e.country] || ""}
                      svg
                      style={{ width: "1.2em", height: "1.2em" }}
                    />
                    <span className="text-sm font-medium">{e.country}</span>
                  </div>

                  {/* STARS */}
                  <div className="flex justify-end">
                    {renderStars(e.impact)}
                  </div>
                </div>

                {/* EVENT NAME */}
                <p className="font-semibold mt-1">{e.event}</p>

                {/* EXTRA INFO */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>ACT: {e.actual || "-"}</span>
                  <span>Cons: {e.consensus || "-"}</span>
                  <span>Prev: {e.previous || "-"}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* DESKTOP CALENDAR RIGHT SIDE */}
      <div className="hidden md:block">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          captionLayout="dropdown"
          fromYear={2010}
          toYear={2035}
          showOutsideDays
          className="rounded-2xl border mt-15 bg-white w-full shadow-sm"
        />
      </div>
    </div>
  );
}
