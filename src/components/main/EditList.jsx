import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdDoNotDisturb } from "react-icons/md";
import { easeIn, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { editList } from "../../redux/features/cards/CardsSlice";

const EditList = ({ setEditListIsOpen, data }) => {
  const [inputValue, setInputValue] = useState(data.listName);
  const [selectedColor, setSelectedColor] = useState(data.backgroundColor);

  const dispatch = useDispatch();
  const colors = [
    { name: "Red", value: "#EC757D" },
    { name: "Green", value: "#92d479" },
    { name: "Blue", value: "#6A8DCC" },
    { name: "Yellow", value: "#FFCA4B" },
  ];
  const setSecondColor = (selectedColor) => {
    switch (selectedColor) {
      case "#EC757D":
        return "#D5434F";
      case "#92d479":
        return "#03AB59";
      case "#6A8DCC":
        return "#416DBE";
      case "#FFCA4B":
        return "#DAC500";
    }
  };
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const editListHandler = () => {
    dispatch(
      editList({
        id: data.id,
        backgroundColor: selectedColor,
        secondBackgroundColor: setSecondColor(selectedColor),
        listName: inputValue,
      })
    );
    setEditListIsOpen(false);
  };
  useEffect(() => {
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, []);
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      setEditListIsOpen(false);
    }
  };
  const onKeyDownHandler = (e) => {
    if (
      e.key === "Enter" &&
      inputValue.length > 3 &&
      selectedColor.length >= 3
    ) {
      editListHandler();
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
        className={`z-30 w-full h-screen fixed bg-black/10 backdrop-blur-sm top-0 left-0`}
        onClick={() => setEditListIsOpen(false)}
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
        className={`fixed z-30  dark:bg-darkSecondary bg-primary rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="w-full p-10 flex justify-center h-full items-center flex-col gap-4">
          <label className="font-semibold self">Title : </label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="w-full px-2 py-1 rounded-lg bg-secondary dark:bg-darkPrimary focus:outline-buttonSecondary dark:text-white focus:outline-double focus:outline-2"
            onKeyDown={onKeyDownHandler}
          />
          <label>Chose color :</label>
          <div className="flex gap-4">
            {colors.map((color) => (
              <label key={color.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={() => handleColorChange(color.value)}
                  className="sr-only"
                  onKeyDown={onKeyDownHandler}
                />

                <span
                  className={`block w-12 h-12 rounded-lg border-2 transition-all duration-200 border-none ${
                    selectedColor === color.value
                      ? "outline-buttonSecondary outline-2 outline-double scale-110"
                      : "outline-none"
                  }`}
                  style={{ backgroundColor: color.value }}
                ></span>
              </label>
            ))}
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="color"
                value="none"
                checked={selectedColor === "none"}
                onChange={() => handleColorChange("none")}
                className="sr-only"
              />

              <span
                className={` w-12 h-12 rounded-lg border-2 transition-all duration-200 border-none flex justify-center items-center ${
                  selectedColor === "none"
                    ? "outline-white outline-2 outline-double scale-110"
                    : "outline-none"
                }`}
              >
                <MdDoNotDisturb size={35} />
              </span>
            </label>
          </div>
          <button
            className="w-1/2 p-2 bg-buttonSecondary rounded-full text-white hover:scale-90 duration-200 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={editListHandler}
            disabled={selectedColor === "" || inputValue.length <= 3}
          >
            Edit
          </button>
          <button
            onClick={() => setEditListIsOpen(false)}
            className="bg-red-200 p-2 rounded-full text-red-700 absolute -top-2 -right-2"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default EditList;
