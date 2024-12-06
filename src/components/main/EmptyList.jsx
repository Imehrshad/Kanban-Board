import { useDroppable } from "@dnd-kit/core";
import React from "react";

const EmptyList = (listId) => {
  const { setNodeRef } = useDroppable({ id: listId });

  return (
    <div
      ref={setNodeRef}
      className="flex justify-center items-center w-full h-10 p-2 rounded-md border-dashed border "
    >
      <p className="text-sm  dark:text-white text-black">
        You can drop from other list
      </p>
    </div>
  );
};

export default EmptyList;
