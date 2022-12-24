import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../util";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import GlobalContext from "../context/GlobalContext";

export default function SmallCalender() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function handleReset() {
    setCurrentMonthIdx(
      currentMonth === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function getDayClass(day) {
    const today = dayjs().format("DD-MM-YY");
    const currentday = day.format("DD-MM-YY");
    const selectday = daySelected && daySelected.format("DD-MM-YY");
    if (today === currentday) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currentday === selectday) {
      return "bg-blue-200 rounded-full font-bold text-black";
    } else {
      return "";
    }
  }

  return (
    <div className=" mt-9 ">
      <div className=" flex mb-3 items-center justify-between text-gray-500">
        {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("YYYY MM")} 月
        <div className=" flex">
          <button
            onClick={handlePrevMonth}
            className=" cursor-pointer text-gray-500 mx-2"
          >
            <AiOutlineLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className=" cursor-pointer text-gray-500 mx-2"
          >
            <AiOutlineRight />
          </button>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="border rounded py-2 px-4 text-gray-500"
          >
            本月
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span className="text-sm py-1 text-center text-gray-500" key={i}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                key={idx}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className={`text-sm ${getDayClass(day)}`}>
                  {day.format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
