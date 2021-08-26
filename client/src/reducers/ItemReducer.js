import {
  GET_ITEMS,
  ADD_ITEMS,
  DEL_ITEMS,
  ITEMS_LOADING,
} from "../actions/types";
const initialState = {
  items: [],
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case ADD_ITEMS:
      return { ...state, items: [action.payload, ...state.items] };
    case DEL_ITEMS:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ITEMS_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
