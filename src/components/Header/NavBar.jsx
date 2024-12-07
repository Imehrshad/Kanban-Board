import React, { useEffect, useState } from "react";
import userImage from "../../assets/images/dummy-user.jpg";
import ThemeButton from "./ThemeButton";
import { AnimatePresence, motion } from "framer-motion";
import { RiTelegram2Fill } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";

const NavBar = () => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [changeName, setChangeName] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChangeName((prevState) => !prevState); // Toggle the state
    }, 2500); // Toggle every 2.5 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  const handleProfileClick = () => {
    setIsProfileClicked(!isProfileClicked);
  };

  const closeProfile = () => {
    setIsProfileClicked(false);
  };

  return (
    <div className="container flex justify-between items-center md:p-main-container p-2">
      {isProfileClicked && (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-black/50 backdrop-blur-sm z-20 flex justify-center items-center"
            onClick={closeProfile}
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, width: 0, height: 0 }}
                whileInView={{
                  opacity: [0, 0.2, 1],
                  width: [0, 50, 350],
                  height: [0, 200, 350],
                  borderRadius: [300, 10],
                }}
                transition={{
                  type: "spring",
                  duration: 1.1,
                  delay: 0.1,
                  damping: 10,
                  staggerChildren: 0.35,
                }}
                exit={{ opacity: 0, width: 0, height: 0 }}
                className="flex justify-center items-center flex-col gap-2 p-2 bg-secondary dark:bg-darkSecondary "
              >
                <img
                  src={userImage}
                  alt="User profile"
                  className="w-2/5 rounded-full"
                />
                <p className="font-semibold md:text-lg text-sm">
                  Mehrshad khatibi
                </p>
                <a
                  href="https://t.me/Mmehrshad779"
                  className="flex justify-center items-center gap-2 w-2/3 bg-buttonPrimary p-2 rounded-lg text-white"
                >
                  <RiTelegram2Fill /> <p>Telegram</p>
                </a>
                <a
                  href="https://github.com/Imehrshad"
                  className="flex justify-center items-center gap-2 w-2/3 bg-buttonPrimary p-2 rounded-lg text-white"
                >
                  <FiGithub /> <p>Github</p>
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.span>
        </AnimatePresence>
      )}

      <h1 className="md:text-2xl text-base font-bold sm:text-lg ">Kanban Board</h1>
      <div className="flex items-center md:gap-4 gap-2 flex-row-reverse">
        <ThemeButton />
        <div
          className=" flex gap-2 items-center px-2  py-1 rounded-md cursor-pointer justify-center bg-secondary dark:bg-darkSecondary hover:bg-buttonPrimary hover:text-white "
          onClick={handleProfileClick}
        >
          <img
            src={userImage}
            alt="User profile"
            className="md:w-11 w-10 border-2 border-secondary overflow-hidden rounded-full"
          />
          <AnimatePresence>
            {changeName && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, damping: 20, type: "spring" }}
                className="font-semibold md:text-sm text-[0.7rem]  whitespace-nowrap"
              >
                Mehrshad khatibi
              </motion.div>
            )}
            {!changeName && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, damping: 20, type: "spring" }}
                className="font-semibold md:text-sm text-[0.7rem] whitespace-nowrap"
              >
                Click for contact!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
