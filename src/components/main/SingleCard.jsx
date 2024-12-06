import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdDragIndicator, MdModeEdit } from "react-icons/md";

const SingleCard = ({ card, item, openEditDialog, removeHandler }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
      data: { listId: item.id },
    });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className={`flex justify-between w-full p-2 rounded-md items-center ${
        item.backgroundColor === "none" ? "dark:bg-darkPrimary bg-primary" : ""
      }`}
      style={{
        backgroundColor:
          item.backgroundColor !== "none" ? item.secondBackgroundColor : "",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <h5 className="text-sm">{card.cardTitle}</h5>
      <div className="flex justify-center items-center gap-1">
        <button
          className="p-1 cursor-pointer dark:hover:bg-white/20 hover:bg-black/20 rounded"
          onClick={() => removeHandler(card)}
        >
          <RiDeleteBinFill
            className={`${
              item.backgroundColor === "none" ? "text-red-700" : "brightness-50"
            }`}
            style={{
              color:
                item.backgroundColor === "none"
                  ? ""
                  : item.secondBackgroundColor,
            }}
          />
        </button>
        <button
          onClick={() => openEditDialog(item, card)}
          className="p-1 cursor-pointer dark:hover:bg-white/20 rounded hover:bg-black/20"
        >
          <MdModeEdit
            className={`${
              item.backgroundColor === "none"
                ? "text-green-700"
                : "brightness-50"
            }`}
            style={{
              color:
                item.backgroundColor === "none"
                  ? ""
                  : item.secondBackgroundColor,
            }}
          />
        </button>
        <button
          {...listeners} // Attach drag listeners only to this button
          className="p-2 cursor-move  rounded-full"
          title="Drag this card"
        >
          <MdDragIndicator />
        </button>
      </div>
    </div>
  );
};

export default SingleCard;
