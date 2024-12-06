import { useSelector } from "react-redux";
import SingleList from "./SingleList";
import { useState } from "react";
import EditBox from "./EditBox";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import AddList from "./AddList";
import EditList from "./EditList";
import { useDispatch } from "react-redux";
import { draggedList } from "../../redux/features/cards/CardsSlice";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";
import { MdDragIndicator } from "react-icons/md";

const MainContainer = () => {
  const [editListIsOpen, setEditListIsOpen] = useState(false);
  const state = useSelector((state) => state.card);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState("");
  const [listId, setListId] = useState("");
  const [addlistIsOpen, setAddListIsOpne] = useState(false);
  const [editListData, setEditListData] = useState();
  const dispatch = useDispatch();
  const [listMenu, setListMenu] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);
  const [draggingList, setDraggingList] = useState("");

  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);

  const sensors = useSensors(touchSensor,mouseSensor);

  const openEditDialog = (item, card) => {
    setEditIsOpen(true);
    setEditingItemId(card.id);
    setListId(item.id);
  };

  const openEditList = (item) => {
    setEditListIsOpen(true);
    setEditListData(item);
  };

  const findCardIndex = (cards, id) =>
    cards.findIndex((card) => card.id === id);

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggingItem(active.id);
    setDraggingList(active.data.current.listId);
    console.log("Drag End Event:", event);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setDraggingList("");
      return;
    }

    const activeListId = active.data.current.listId;
    const overListId =
      over.data.current === undefined
        ? over.id.listId
        : over.data.current.listId; 
    console.log(overListId);
    if (activeListId === overListId) {
     
      const listIndex = state.findIndex((list) => list.id === activeListId);
      const cards = state[listIndex].cards;
      const oldIndex = findCardIndex(cards, active.id);
      const newIndex = findCardIndex(cards, over.id);
      const updatedCards = reorder(cards, oldIndex, newIndex);

      const newState = [...state];
      newState[listIndex] = { ...newState[listIndex], cards: updatedCards };

      dispatch(draggedList(newState));
      setDraggingItem(null);
      setDraggingList("");
    } else {

      const sourceListIndex = state.findIndex(
        (list) => list.id === activeListId
      );
      const targetListIndex = state.findIndex((list) => list.id === overListId);

      const card = state[sourceListIndex].cards.find(
        (card) => card.id === active.id
      );

      const sourceCards = state[sourceListIndex].cards.filter(
        (card) => card.id !== active.id
      );
      const targetCards = [...state[targetListIndex].cards, card];

      const newState = [...state];
      newState[sourceListIndex] = {
        ...newState[sourceListIndex],
        cards: sourceCards,
      };
      newState[targetListIndex] = {
        ...newState[targetListIndex],
        cards: targetCards,
      };

      dispatch(draggedList(newState));
      setDraggingItem(null);
      setDraggingList("");
    }
  };
  const findList = () => {
    return state.find((item) => item.id === draggingList);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div className="container flex justify-start  items-start md:flex-row flex-col py-4 md:px-1 px-4 flex-wrap gap-2 ">
        <AnimatePresence>
          {state.map((item, index) => (
            <SingleList
              key={index}
              item={item}
              index={index}
              openEditDialog={openEditDialog}
              editListIsOpen={editListIsOpen}
              openEditList={openEditList}
              listMenu={listMenu}
              setListMenu={setListMenu}
            />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {editIsOpen && (
            <EditBox
              editIsOpen={editIsOpen}
              setEditIsOpen={setEditIsOpen}
              editingItemId={editingItemId}
              listId={listId}
            />
          )}
        </AnimatePresence>
        <div className="fixed  left-0 right-0 flex justify-center bottom-0 mb-10 pointer-events-none  ">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setAddListIsOpne(true)}
            className=" px-5 py-3 bg-buttonSecondary text-white rounded-full  font-bold pointer-events-auto"
          >
            New List
          </motion.button>
        </div>
        <AnimatePresence>
          {addlistIsOpen && <AddList setAddListIsOpne={setAddListIsOpne} />}
        </AnimatePresence>
        <AnimatePresence>
          {editListIsOpen && (
            <EditList
              setEditListIsOpen={setEditListIsOpen}
              data={editListData}
            />
          )}
        </AnimatePresence>
      </div>
      <DragOverlay>
        {draggingItem ? (
          <div
            className={`flex justify-between w-full p-2 rounded-md items-center ${
              findList().backgroundColor === "none"
                ? "dark:bg-darkPrimary bg-primary"
                : ""
            }`}
            style={{
              backgroundColor:
                findList().backgroundColor !== "none"
                  ? findList().secondBackgroundColor
                  : "",
              transform: CSS.Transform,
            }}
          >
            <h5 className="text-sm">
              {" "}
              {state
                .flatMap((list) => list.cards)
                .find((card) => card.id === draggingItem)?.cardTitle ||
                "Dragging..."}
            </h5>
            <div className="flex justify-center items-center gap-1">
              <button
                className="p-2 cursor-move  rounded-full"
                title="Drag this card"
              >
                <MdDragIndicator />
              </button>
            </div>
            {/* Render the dragged item's preview */}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default MainContainer;
