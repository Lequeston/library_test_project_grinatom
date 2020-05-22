import {combineReducers} from "redux";
import cardsBookReducer from "./redusers/cardsBookReducer";

const rootReducer = combineReducers({
  arrayBooks: cardsBookReducer
});

export default rootReducer;