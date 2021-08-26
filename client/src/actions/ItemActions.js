import { GET_ITEMS, ADD_ITEMS, DEL_ITEMS, ITEMS_LOADING } from "./types";
export const getItem = (res) => {
  return {
    type: GET_ITEMS,
    payload: res.data,
  };
};
export const delItem = (id) => {
  return {
    type: DEL_ITEMS,
    payload: id
  };
};
export const addItem = (item) => {
  
  return {
    type:ADD_ITEMS,
    payload:item
  }
};
  
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
