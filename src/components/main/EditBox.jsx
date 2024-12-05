import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { easeIn, easeInOut, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { editCard } from "../../redux/features/cards/CardsSlice";

const EditBox = ({ editIsOpen, setEditIsOpen, editingItemId, listId }) => {
  const cards = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const [currentCard, setCurrentCard] = useState("");
  const inputValue = useRef();

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
    inputValue.current.value = currentCard.cardTitle;
  }, [currentCard.cardTitle]);

  const changeTitle = () => {
    dispatch(
      editCard({ cardId: currentCard.id, cardTitle: inputValue.current.value })
    );
    setEditIsOpen(false);
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
        initial={{ opacity: 0, width: 100, height: 0 }}
        whileInView={{ opacity: 1, width: 300, height: 300 }}
        exit={{ opacity: 0, width: 100, height: 0 }}
        transition={{ delay: 0.1, duration: 0.15 }}
        className={`fixed z-30    dark:bg-darkSecondary bg-primary rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="w-full p-10 flex justify-center h-full items-center flex-col gap-4">
          <label className="font-semibold">Title : </label>
          <input
            ref={inputValue}
            type="text"
            className="w-full px-2 py-1 rounded-lg bg-secondary dark:bg-darkPrimary focus:outline-buttonSecondary dark:text-white"
          />
          <button
            className="w-1/2 p-2 bg-buttonSecondary rounded-full text-white hover:scale-90 duration-200 transition-transform"
            onClick={changeTitle}
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
