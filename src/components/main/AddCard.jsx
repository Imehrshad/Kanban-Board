import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addCard } from "../../redux/features/cards/CardsSlice";

const AddCard = ({ setOpenForm, openForm, item }) => {
  function generateUUID() {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const closeHandler = () => {
    setOpenForm({ ...openForm, isOpen: !openForm.isOpen });
  };

  const addCardHandler = () => {
    dispatch(
      addCard({
        id: openForm.id,
        item: {
          id: generateUUID(),
          cardTitle: inputValue,
          priority: "high",
        },
      })
    );
    setInputValue("");
    setOpenForm(false);
  };
  const enterAddCard = (e) => {
    if (e.key === "Enter" && inputValue.length > 3) {
      addCardHandler();
    } else if (e.key === "Escape") {
      closeHandler();
    } else {
      return;
    }
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className={`w-full px-2 py-1 rounded-md  ${
          item.backgroundColor === "none"
            ? "bg-primary dark:bg-darkPrimary focus:outline-buttonPrimary focus:outline-double focus:outline-2 "
            : "focus:outline-black/30 focus:outline-double focus:outline-2"
        }`}
        style={{
          backgroundColor:
            item.backgroundColor === "none" ? "" : item.secondBackgroundColor,
        }}
        onKeyDown={enterAddCard}
      />
      <div className="flex justify-start items-center gap-2">
        <button
          className={`px-4 py-1 rounded  text-sm font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed bg-buttonPrimary ${
            item.backgroundColor === "none" ? " " : "brightness-95"
          }`}
          onClick={addCardHandler}
          disabled={inputValue.length <= 3}
        >
          Add
        </button>
        <button
          className={`px-4 py-1 text-rose-900  bg-rose-500/95 rounded 
          `}
          onClick={closeHandler}
        >
          <IoMdClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default AddCard;
