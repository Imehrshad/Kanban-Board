import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/features/theme/themeSlice";

const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);


  const changeTheme = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    dispatch(setTheme(newTheme))
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={theme === "dark"} 
        onChange={changeTheme} 
      />
      <div
        className={`relative sm:w-14 sm:h-8 w-12 h-7 rounded-full transition-all duration-300 ${
          theme === "dark" ? "bg-sky-800" : "bg-amber-500"
        }`}
      >
        <div
          className={`absolute top-1/2 transform z-10 -translate-y-1/2 transition-all duration-300 ${
            theme === "dark" ? "lg:translate-x-7 translate-x-6" : "lg:translate-x-1 translate-x-1"
          } bg-white rounded-full lg:w-6 lg:h-6 w-5 h-5`}
        ></div>
        <FaMoon
          className={`absolute top-1/2 -translate-y-1/2 left-1 text-sky-950 ${
            theme === "dark" ? "block" : "hidden"
          }`}
        />
        <FaSun
          className={`absolute top-1/2 -translate-y-1/2 right-1 text-amber-400 ${
            theme === "dark" ? "hidden" : "block"
          }`}
        />
      </div>
    </label>
  );
};

export default ThemeButton;
