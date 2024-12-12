import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { easeIn, easeInOut, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { editCard } from "../../redux/features/cards/CardsSlice";

const EditBox = ({ editIsOpen, setEditIsOpen, editingItemId, listId }) => {
  const cards = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const [currentCard, setCurrentCard] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    cards.find((item) => {
      if (item.id === listId) {
        const cardItem = item.cards.find((item) => item.id === editingItemId);
        setCurrentCard(cardItem);
      } else {
        return false;
      }
    });
  }, [editingItemId]);

  useEffect(() => {
    setInputValue(currentCard.cardTitle);
  }, [currentCard.cardTitle]);

  const changeTitle = () => {
    dispatch(editCard({ cardId: currentCard.id, cardTitle: inputValue }));
    setEditIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, []);

  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      setEditIsOpen(false);
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter" && inputValue.length > 3) {
      changeTitle();
    } else {
      return;
    }
  };
  return (
    <>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: easeIn }}
        className={`w-full h-screen fixed bg-black/10 backdrop-blur-sm top-0 left-0 z-30`}
        onClick={() => setEditIsOpen(false)}
      ></motion.span>
      <motion.div
        initial={{ opacity: 0, width: 0, height: 0 }}
        whileInView={{
          opacity: [0, 0.2, 1],
          width: [0, 50, 350],
          height: [0, 150, 350],
          borderRadius: [300, 10],
          transition: {
            type: "spring",
            duration: 1.1,
            delay: 0.1,
            damping: 12,
            staggerChildren: 0.35,
          },
        }}
        exit={{
          opacity: [100, 0, 0],
          width: [350, 50, 0],
          height: [350, 150, 0],
          borderRadius: [10, 50, 100],
          transition: { duration: 0.5, staggerChildren: 0.5 },
        }}
        className={`fixed z-30    dark:bg-darkSecondary bg-primary rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="w-full p-10 flex justify-center h-full items-center flex-col gap-4">
          <label className="font-semibold">Title : </label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="w-full px-2 py-1 rounded-lg bg-secondary dark:bg-darkPrimary focus:outline-buttonSecondary dark:text-white"
            onKeyDown={onKeyDownHandler}
          />
          <button
            className="w-1/2 p-2 bg-buttonSecondary rounded-full text-white hover:scale-90 duration-200 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={changeTitle}
            disabled={inputValue.length <= 3}
          >
            Edit
          </button>
          <button
            onClick={() => setEditIsOpen(false)}
            className="bg-red-200 p-2 rounded-full text-red-700 absolute -top-2 -right-2"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default EditBox;
