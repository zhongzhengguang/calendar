import Image from "next/image";
import React, { useContext } from "react";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCalendar,
} from "react-icons/ai";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className=" mr-10 text-xl text-white font-bold">日曆</h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5 text-white flex justify-center items-center "
      >
        <AiOutlineCalendar className=" flex justify-center items-center mr-2" />
        {dayjs().format("DD")}
      </button>
      <button onClick={handlePrevMonth} className="  text-white mx-2 ">
        <AiOutlineLeft />
      </button>
      <button
        onClick={handleNextMonth}
        className=" cursor-pointer text-white mx-2"
      >
        <AiOutlineRight />
      </button>
      <h2 className=" ml-4 text-xl text-white font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MM")} 月
      </h2>
    </header>
  );
}
