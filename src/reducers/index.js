import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

const allReducers = combineReducers({
    cart: cartReducer
})

export default allReducers