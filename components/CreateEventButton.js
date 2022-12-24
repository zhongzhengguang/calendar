import Image from "next/image";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { showEventModal, setShowEventModal } = useContext(GlobalContext);
  return (
    <div className=" mt-5">
      <button
        onClick={() => setShowEventModal(true)}
        className="border border-white p-2 rounded-full flex items-center shadow-md cursor-pointer"
      >
        <span className="py-1 px-3 text-gray-500 ">建立事項</span>
      </button>
    </div>
  );
}
