import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import AddCard from "./AddCard";
import { useDispatch } from "react-redux";
import { removeCard } from "../../redux/features/cards/CardsSlice";
import ListMenu from "./ListMenu";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SingleCard from "./SingleCard";
import EmptyList from "./EmptyList";

const SingleList = ({
  item,
  index,
  openEditDialog,
  openEditList,
  listMenu,
  setListMenu,
}) => {
  const animationVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
      },
    }),
    exit: { opacity: 0, y: 100, transition: { delay: 0.3, duration: 0.3 } },
  };
  const [openForm, setOpenForm] = useState({
    id: 0,
    isOpen: false,
  });
  const dispatch = useDispatch();
  const openFormHandler = (id) => {
    setOpenForm({ id: id, isOpen: true });
  };
  const removeHandler = (card) => {
    dispatch(removeCard({ listId: item.id, item: { id: card.id } }));
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      exit="exit"
      custom={index}
      key={item.id}
      className={`  p-4 lg:basis-[24%] md:basis-[31%] w-full rounded-md flex flex-col justify-start items-center gap-2  ${
        item.backgroundColor === "none"
          ? "dark:bg-darkSecondary bg-secondary"
          : ""
      }`}
      style={{
        backgroundColor:
          item.backgroundColor != "none" ? item.backgroundColor : "",
      }}
    >
      <div
        className={`flex justify-between w-full  p-2 rounded-md items-center relative ${
          item.backgroundColor === "none"
            ? "dark:bg-darkPrimary bg-primary"
            : ""
        }`}
        style={{
          backgroundColor:
            item.backgroundColor === "none" ? "" : item.secondBackgroundColor,
        }}
      >
        <h3 className="font-bold text-lg">{item.listName}</h3>
        <button
          className="p-1 cursor-pointer listMenu dark:hover:bg-white/20  hover:bg-black/20 rounded  "
          onClick={(e) => {
            e.stopPropagation();
            setListMenu((prev) => (prev === item.id ? null : item.id));
          }}
        >
          <FiMoreVertical className="cursor-pointer" />
        </button>
        {listMenu === item.id && (
          <ListMenu
            listMenu={listMenu}
            item={item}
            setListMenu={setListMenu}
            openEditList={openEditList}
          />
        )}
      </div>
      <SortableContext
        items={item.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {item.cards.length === 0 ? (
          <EmptyList listId={item.id} />
        ) : (
          item.cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              item={item}
              openEditDialog={openEditDialog}
              removeHandler={removeHandler}
            />
          ))
        )}
      </SortableContext>

      {item.id === openForm.id && openForm.isOpen ? (
        <AddCard setOpenForm={setOpenForm} openForm={openForm} item={item} />
      ) : (
        <button
          className={`p-2 w-full flex gap-3 items-center text-buttonPrimary rounded-md ${
            item.backgroundColor === "none"
              ? "text-buttonPrimary hover:bg-buttonSecondary/10 "
              : ""
          }`}
          onClick={() => openFormHandler(item.id)}
          style={{}}
        >
          <GoPlus
            size={22}
            style={{
              color:
                item.backgroundColor === "none"
                  ? ""
                  : item.secondBackgroundColor,
            }}
          />
          <p
            className={`font-bold text-sm  ${
              item.backgroundColor === "none" ? "" : "brightness-50"
            }`}
            style={{
              color:
                item.backgroundColor === "none"
                  ? ""
                  : item.secondBackgroundColor,
            }}
          >
            Add card
          </p>
        </button>
      )}
    </motion.div>
  );
};

export default SingleList;
