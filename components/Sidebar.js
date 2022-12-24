import React, { useState } from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalender from "./SmallCalendar";
import Label from "./Label";
export default function Sidebar() {
  return (
    <aside className=" border border-white p-5 w-[30vh] text-gray-700 hidden md:flex bg-white">
      <div>
        <CreateEventButton />
        <SmallCalender />
        <Label />
      </div>
    </aside>
  );
}
