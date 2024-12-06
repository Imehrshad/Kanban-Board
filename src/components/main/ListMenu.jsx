import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeList } from "../../redux/features/cards/CardsSlice";

const ListMenu = ({ item, setListMenu, openEditList, listMenu }) => {
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const removeHandler = () => {
    dispatch(removeList(item.id));
    setListMenu(null);
  };
  const openEditHandler = () => {
    openEditList(item);
    setListMenu(null);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.className !== "listMenu" 
    ) {
      setListMenu(null);
    }
  };
  useEffect(() => {
    if (listMenu === item.id) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [listMenu, handleClickOutside]);

  return (
    <div
      ref={menuRef}
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
