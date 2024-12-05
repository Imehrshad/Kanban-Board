import React from "react";
import { useDispatch } from "react-redux";
import { removeList } from "../../redux/features/cards/CardsSlice";

const ListMenu = ({ item, setListMenu, openEditList }) => {
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(removeList(item.id));
    setListMenu(false);
  };
  const openEditHandler = () => {
    openEditList(item);
    setListMenu(false);
  };
  return (
    <div
      className={`z-10 absolute top-10 right-2 w-36 h-28 rounded-lg flex flex-col justify-start gap-2 items-center p-4 dark:border-white/10 border-black/10  border ${
        item.backgroundColor === "none"
          ? " dark:bg-darkPrimary   bg-primary"
          : "dark:border-white/20 border-black/20"
      }`}
      style={{
        backgroundColor:
          item.backgroundColor === "none" ? "" : item.backgroundColor,
      }}
    >
      <button
        className={` w-full p-2 rounded hover:brightness-125 text-sm ${
          item.backgroundColor === "none"
            ? " bg-secondary dark:bg-darkSecondary"
            : ""
        }`}
        style={{
          backgroundColor:
            item.backgroundColor === "none" ? "" : item.secondBackgroundColor,
        }}
        onClick={openEditHandler}
      >
        Edit
      </button>
      <button
        className={` w-full p-2 rounded hover:brightness-125 text-sm ${
          item.backgroundColor === "none"
            ? " bg-secondary dark:bg-darkSecondary"
            : ""
        }`}
        style={{
          backgroundColor:
            item.backgroundColor === "none" ? "" : item.secondBackgroundColor,
        }}
        onClick={removeHandler}
      >
        Remove
      </button>
    </div>
  );
};

export default ListMenu;
