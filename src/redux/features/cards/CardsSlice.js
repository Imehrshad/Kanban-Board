import { createSlice } from "@reduxjs/toolkit";
function generateUUID() {
  return crypto.getRandomValues(new Uint32Array(1))[0];
}
const initialState = [
  {
    id: generateUUID(),
    listName: "To Do",
    cards: [
      { id: generateUUID(), cardTitle: "some task 1", priority: "high" },
      { id: generateUUID(), cardTitle: "some task 2", priority: "low" },
    ],
    backgroundColor: "#6A8DCC",
    secondBackgroundColor: "#416DBE",
  },
  {
    id: generateUUID(),
    listName: "On goin",
    cards: [
      { id: generateUUID(), cardTitle: "some task 1", priority: "medium" },
      { id: generateUUID(), cardTitle: "some task 2", priority: "low" },
    ],
    backgroundColor: "#FFCA4B",
    secondBackgroundColor: "#DAC500",
  },
  {
    id: generateUUID(),
    listName: "Done",
    cards: [
      { id: generateUUID(), cardTitle: "some task 1", priority: "medium" },
      { id: generateUUID(), cardTitle: "some task 2", priority: "low" },
    ],
    backgroundColor: "#92d479",
    secondBackgroundColor: "#03AB59",
  },
];

const cardSlice = createSlice({
  name: "card slice",
  initialState,
  reducers: {
    addList: (state, action) => {
      return (state = [...state, action.payload]);
    },
    editList: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            backgroundColor: action.payload.backgroundColor,
            secondBackgroundColor: action.payload.secondBackgroundColor,
            listName: action.payload.listName,
          };
        } else {
          return item;
        }
      });
    },
    draggedList: (state, action) => {
      return (state = action.payload);
    },
    removeList: (state, action) => {
      return (state = state.filter((item) => {
        return item.id !== action.payload;
      }));
    },
    addCard: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            cards: [...item.cards, action.payload.item],
          };
        }
        return item;
      });
    },
    removeCard: (state, action) => {
      return state.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            cards: list.cards.filter(
              (card) => card.id !== action.payload.item.id
            ),
          };
        }
        return list;
      });
    },
    editCard: (state, action) => {
      return state.map((list) => {
        return {
          ...list,
          cards: list.cards.map((card) => {
            if (card.id === action.payload.cardId) {
              return { ...card, cardTitle: action.payload.cardTitle };
            }
            return card;
          }),
        };
      });
    },
  },
});

export const {
  addList,
  addCard,
  removeCard,
  editCard,
  removeList,
  editList,
  draggedList,
} = cardSlice.actions;
export default cardSlice.reducer;
