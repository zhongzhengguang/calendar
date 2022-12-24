import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setShowEventModal,
    setDaySelected,
    daySelected,
    savedEvents,
    setSelectedEvent,
    selectedEvent,
    filterEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filterEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filterEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7 "
      : "";
  }

  function getDayClass(day) {
    const today = dayjs().format("DD-MM-YY");
    const currentday = day.format("DD-MM-YY");
    const selectday = daySelected && daySelected.format("DD-MM-YY");
    if (today === currentday) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currentday === selectday) {
      return "bg-blue-400 rounded-full font-bold text-white";
    } else {
      return "";
    }
  }

  return (
    <div
      className="border border-white flex flex-col cursor-pointer h-[181px] "
      onClick={() => setDaySelected(day)}
    >
      <header
        className="flex flex-col items-center text-white"
        onClick={() => setShowEventModal(true)}
      >
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}

        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()} ${getDayClass(
            day
          )}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className=" flex-1 cursor-pointer overflow-y-auto "
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200  p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ml-1`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
