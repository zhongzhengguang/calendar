import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiFillDelete } from "react-icons/ai";
import { MdDragHandle, MdSchedule, MdSegment } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";
import { BsBookmark } from "react-icons/bs";
let labelsClasses = ["gray", "green", "blue", "purple"];
function EventModal() {
  const { daySelected, setShowEventModal, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  function handleSubmit(e) {
    e.preventDefault();
    // 防止默認
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  }

  return (
    <div className=" h-screen w-full fixed left-0 top-0 flex justify-center items-center ">
      <form className="bg-white rounded-lg shadow-2xl w-[40vh]">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <MdDragHandle className=" text-gray-400 outline-none" />
          <div className="flex space-x-2">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                <AiFillDelete />
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <AiOutlineClose className=" text-gray-400 outline-none cursor-pointer" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <div className=" flex items-center  space-x-5 w-full ">
              <MdSchedule className="text-white" />
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>
            <div className=" flex items-center space-x-5">
              <MdSchedule className=" text-gray-400 outline-none" />
              <p>{daySelected.format(" MM 月 D 號")}</p>
            </div>
            <div className=" flex items-center space-x-5">
              <MdSegment className=" text-gray-400 outline-none" />
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>
            <div className=" flex space-x-5 items-center">
              <BsBookmark className=" text-gray-400 outline-none" />
              <div className=" flex space-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <AiOutlineCheck className=" text-white" />
                    )}
                  </span>
                ))}
              </div>
            </div>
            <footer className=" flex justify-end ">
              {selectedEvent ? (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white"
                >
                  更新
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white"
                >
                  +
                </button>
              )}
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventModal;
