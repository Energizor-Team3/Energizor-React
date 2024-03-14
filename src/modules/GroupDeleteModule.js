import { createActions, handleActions } from "redux-actions";


export const { addUniqueData, removeItem, clearData } =
  createActions({
    ADD_UNIQUE_DATA: (data) => data,
    REMOVE_ITEM: (indexToRemove) => indexToRemove,
    CLEAR_DATA: () => {},
  });

  const initialState = {
    data: [],
    deletedItems: [],
  };


  const groupDeleteReducer = handleActions(
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
  
  export default groupDeleteReducer;
