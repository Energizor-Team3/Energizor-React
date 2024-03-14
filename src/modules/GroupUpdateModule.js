import { createActions, handleActions } from "redux-actions";
// import { addUniqueData, updateItemName, removeItem , clearData} from '../modules/GroupUpdateModule';

  // createActions
export const { addUniqueData, updateItemName, removeItem, clearData } =
  createActions({
    ADD_UNIQUE_DATA: (data) => data.map((item) => ({ ...item, newName: "" })),
    UPDATE_ITEM_NAME: (index, newName) => ({ index, newName }),
    REMOVE_ITEM: (indexToRemove) => indexToRemove,
    CLEAR_DATA: () => {},
  });

  // handleActions
const initialState = {
  data: [],
  deletedItems: [],
};

const groupUpdateReducer = handleActions(
  {
    [addUniqueData]: (state, { payload }) => ({
      ...state,
      data: [
        ...state.data,
        ...payload.filter(
          (item) =>
            !state.data.some((dataItem) => dataItem.name === item.name) &&
            !state.deletedItems.includes(item.name)
        ),
      ],
    }),
    [updateItemName]: (state, { payload: { index, newName } }) => ({
      ...state,
      data: state.data.map((item, idx) =>
        idx === index ? { ...item, newName: newName } : item
      ),
    }),
    [removeItem]: (state, { payload: indexToRemove }) => ({
      ...state,
      data: state.data.filter((_, index) => index !== indexToRemove),
      deletedItems: [...state.deletedItems, state.data[indexToRemove].name],
    }),
    [clearData]: (state, action) => ({
      ...state,
      data: [],
    }),
  },
  initialState
);

export default groupUpdateReducer;
