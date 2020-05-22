import {
  ADD_CHOSEN,
  DECREASE_RATING, DELETE_CHOSEN,
  FETCH_ADD_BOOKS,
  FILTER,
  INCREASE_RATING,
  LOAD_PHOTO,
  SEARCH_BY_NAME,
  SORT_ARRAY, VIEW_CHOSEN
} from "./types";
import {URL_BOOKS} from "./setting";

export const fetchAddBooks = () => {
  return async dispatch => {
    try {
      const response = await fetch(URL_BOOKS);
      const json = await response.json();
      dispatch({type: FETCH_ADD_BOOKS, books: json});
    } catch (e) {
      console.log(e);
    }
  }
}

export const loadPhoto = (id, url) => {
  return async dispatch => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      dispatch({type: LOAD_PHOTO, blob, id});
    } catch (e) {
      console.log(e);
    }
  }
}

export const searchByName = (str) => {
  return {
    type: SEARCH_BY_NAME,
    payload: str
  }
}

export const increaseRating = (id) => {
  return {
    type: INCREASE_RATING,
    id
  }
}

export const decreaseRating = (id) => {
  return {
    type: DECREASE_RATING,
    id
  }
}

export const filter = (typeFilter, value) => {
  return {
    type: FILTER,
    typeFilter,
    value
  }
}

export const sortBooks = (typeSort) => {
  return {
    type: SORT_ARRAY,
    typeSort
  }
}

export const addChosen = (id) => {
  return {
    type: ADD_CHOSEN,
    id
  }
}

export const deleteChosen = (id) => {
  return {
    type: DELETE_CHOSEN,
    id
  }
}

export const viewChosen = () => {
  return {
    type: VIEW_CHOSEN
  }
}