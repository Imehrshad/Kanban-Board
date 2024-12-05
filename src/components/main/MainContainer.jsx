import { useSelector } from "react-redux";
import SingleList from "./SingleList";
import { useEffect, useState } from "react";
import EditBox from "./EditBox";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import AddList from "./AddList";
import EditList from "./EditList";
const MainContainer = () => {
  const [editListIsOpen, setEditListIsOpen] = useState(false);
  const state = useSelector((state) => state.card);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState("");
  const [listId, setListId] = useState("");
  const [addlistIsOpen, setAddListIsOpne] = useState(false);
  const [editListData, setEditListData] = useState();

  const openEditDialog = (item, card) => {
    setEditIsOpen(true);
    setEditingItemId(card.id);
    setListId(item.id);
  };
  const openEditList = (item) => {
    setEditListIsOpen(true);
    setEditListData(item)
  };
  return (
    <div className="container flex justify-start items-start md:flex-row flex-col py-4 md:px-1 px-4 flex-wrap gap-2 ">
      <AnimatePresence>
        {state.map((item, index) => (
          <SingleList
            item={item}
            index={index}
            openEditDialog={openEditDialog}
            key={item.id}
            editListIsOpen={editListIsOpen}
            openEditList={openEditList}
          />
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {editIsOpen && (
          <EditBox
            editIsOpen={editIsOpen}
            setEditIsOpen={setEditIsOpen}
            editingItemId={editingItemId}
            listId={listId}
          />
        )}
      </AnimatePresence>
      <div className="fixed  left-0 right-0 flex justify-center bottom-0 mb-10 pointer-events-none  ">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => setAddListIsOpne(true)}
          className=" px-5 py-3 bg-buttonSecondary text-white rounded-full  font-bold pointer-events-auto"
        >
          New List
        </motion.button>
      </div>
      <AnimatePresence>
        {addlistIsOpen && <AddList setAddListIsOpne={setAddListIsOpne} />}
      </AnimatePresence>
      <AnimatePresence>
        {editListIsOpen && <EditList setEditListIsOpen={setEditListIsOpen} data={editListData} />}
      </AnimatePresence>
    </div>
  );
};

export default MainContainer;
