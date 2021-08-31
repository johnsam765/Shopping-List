import {
    combineReducers
} from "redux";
import itemReducer from "./ItemReducer"
import authReducer from "./AuthReducer"
import errorReducer from "./ErrorReducer"

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    error: errorReducer
})