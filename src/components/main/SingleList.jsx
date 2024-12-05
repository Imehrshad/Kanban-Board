import React, { useEffect, useState } from "react";
import { delay, motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import AddCard from "./AddCard";
import { useDispatch } from "react-redux";
import { removeCard } from "../../redux/features/cards/CardsSlice";
import ListMenu from "./ListMenu";

const SingleList = ({ item, index, openEditDialog, openEditList }) => {
  const [listMenu, setListMenu] = useState(false);
  const animationVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
      },
    }),
    exit: { opacity: 0, y: 100, transition: { delay: 0.2, duration: 0.3 } },
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
  console.log(item.backgroundColor);
  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      exit="exit"
      custom={index}
      key={item.id}
      className={`  p-4 md:basis-[24%] w-full rounded-md flex flex-col justify-start items-center gap-2  ${
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
          className="p-1 cursor-pointer  dark:hover:bg-white/20  hover:bg-black/20 rounded"
          onClick={() => setListMenu(!listMenu)}
        >
          <FiMoreVertical className="cursor-pointer" />
        </button>
        {listMenu && <ListMenu item={item} setListMenu={setListMenu} openEditList={openEditList} />}
      </div>
      {item.cards.map((card) => (
        <div
          className={`flex justify-between w-full   p-2 rounded-md items-center ${
            item.backgroundColor === "none"
              ? "dark:bg-darkPrimary bg-primary "
              : ""
          }`}
          style={{
            backgroundColor:
              item.backgroundColor != "none" ? item.secondBackgroundColor : "",
          }}
        >
          <h5 className="text-sm">{card.cardTitle}</h5>
          <div className="flex justify-center items-center gap-1">
            <button
              className="p-1 cursor-pointer dark:hover:bg-white/20 hover:bg-black/20 rounded"
              onClick={() => removeHandler(card)}
            >
              <RiDeleteBinFill
                className={` ${
                  item.backgroundColor === "none"
                    ? "text-red-700"
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
              onClick={() => openEditDialog(item, card)}
              className="p-1 cursor-pointer  dark:hover:bg-white/20 rounded hover:bg-black/20 "
            >
              <MdModeEdit
                className={` ${
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
          </div>
        </div>
      ))}
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
