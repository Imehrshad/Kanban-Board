import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "./components/Header/NavBar";
import MainContainer from "./components/main/MainContainer";

export default function App() {
  useEffect(() => {

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);
  const themeState = useSelector((state) => state.theme);
  const isDarkMode = themeState.theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="flex justify-start items-center flex-col">
      <div className="w-full flex justify-center items-center dark:bg-darkSecondary bg-secondary sticky top-0 z-20">
        <NavBar />
      </div>
      <div className="w-full flex justify-center items-start h-full">
        <MainContainer />
      </div>
    </div>
  );
}
