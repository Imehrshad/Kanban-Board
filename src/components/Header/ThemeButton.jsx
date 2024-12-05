import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/features/theme/themeSlice";

const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Access the current theme from Redux

  // Toggle theme
  const changeTheme = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    dispatch(setTheme(newTheme)); // Dispatch the theme change
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={theme === "dark"} // Set the initial state based on the Redux theme
        onChange={changeTheme} // Handle theme toggle on change
      />
      <div
        className={`relative w-14 h-8  rounded-full transition-all duration-300 ${
          theme === "dark" ? "bg-sky-800" : "bg-amber-500"
        }`}
      >
        <div
          className={`absolute top-1/2 transform z-10 -translate-y-1/2 transition-all duration-300 ${
            theme === "dark" ? "translate-x-7" : "translate-x-1"
          } bg-white rounded-full w-6 h-6`}
        ></div>
        <FaMoon
          className={`absolute top-1/2 -translate-y-1/2 left-1 text-sky-950 ${
            theme === "dark" ? "block" : "hidden"
          }`}
        />
        <FaSun className={`absolute top-1/2 -translate-y-1/2 right-1 text-amber-400 ${            theme === "dark" ? "hidden" : "block"}`} />
      </div>
    </label>
  );
};

export default ThemeButton;
