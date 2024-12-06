import React from "react";
import userImage from "../../assets/images/dummy-user.jpg";
import ThemeButton from "./ThemeButton";

const NavBar = () => {
  return (
    <div className="container flex  justify-between items-center md:p-main-container p-2 ">
      <h1 className="md:text-2xl text-lg font-bold">Kanban Board</h1>
      <div className="flex items-center md:gap-4 gap-2 flex-row-reverse">
        <ThemeButton />
        <div className=" flex gap-2 items-center px-2 backdrop-blur-2xl py-1 rounded-md cursor-pointer  bg-white/10  hover:bg-buttonPrimary hover:text-white">
          <img
            src={userImage}
            alt="User profile"
            className="md:w-11 w-9 border-2 border-secondary overflow-hidden rounded-full"
          />
          <p className="font-semibold md:text-sm text-xs">Mehrshad khatibi</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
