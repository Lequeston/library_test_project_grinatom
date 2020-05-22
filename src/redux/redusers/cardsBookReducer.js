import {
  DECREASE_RATING,
  FETCH_ADD_BOOKS, FILTER,
  INCREASE_RATING,
  LOAD_PHOTO,
  SEARCH_BY_NAME,
  TYPE_FILTER_AUTHOR,
  TYPE_FILTER_DATE_BIRTH_YEAR,
  TYPE_FILTER_DEFAULT, TYPE_FILTER_INPUT_TEXT,
  TYPE_FILTER_PUBLISHING_HOUSE
} from "../types";

const ALL_VALUES = "Всё";

const initialState = {
  arrayBooks: [],
  filters: [
    {
      name: "Выберите издательство",
      options: [ALL_VALUES],
      type: TYPE_FILTER_PUBLISHING_HOUSE
    },
    {
      name: "Выберите автора",
      options: [ALL_VALUES],
      type: TYPE_FILTER_AUTHOR
    },
    {
      name: "Выберите год",
      options: [ALL_VALUES],
      type: TYPE_FILTER_DATE_BIRTH_YEAR
    },
  ]
}

/*
const sortAlphabet = (a, b) => {
  if (a === b){
    return 0;
  } else {
    let length = Math.min(a.length, b.length);
    for (let i = 0; i < length; i++){
      if (a[i] > b[i]) {
        return -1;
      } else if (a[i] < b[i]){
        return 1;
      }
    }
    if (a.length > b.length){
      return -1;
    }
    return 1;
  }
}

const sortNumber = (a, b) => {
  return a - b;
}

const sortDate = (first, second) => {
  const a = new Date(first.year, first.month, first.day);
  const b = new Date(second.year, second.month, second.day);
  return b - a;
}
*/
const cardsBookReducer = (state = initialState, action) => {
  let arrayBooks, filters;

  const ratingChange = () => {
    const {id, type} = action;
    const index = state.arrayBooks.findIndex(book => book.id === id);
    const length = state.arrayBooks.length;
    const elem = {...state.arrayBooks[index]};
    elem.rating = (type === INCREASE_RATING) ? elem.rating + 1 : elem.rating - 1;
    return [...state.arrayBooks.slice(0, index), elem, ...state.arrayBooks.slice(index + 1, length)];
  };

  const addFilters = (total, { publishingHouse, author, dateBirth}) => {
    let res = [...total]
    res.forEach(elem => {
      switch (elem.type) {
        case TYPE_FILTER_PUBLISHING_HOUSE:
          elem.options = [...elem.options, publishingHouse];
          break;
        case TYPE_FILTER_DATE_BIRTH_YEAR:
          elem.options = [...elem.options, dateBirth.year];
          break;
        case TYPE_FILTER_AUTHOR:
          elem.options = [...elem.options, author];
          break;
        default:
          break;
      }
    });
    return res;
  };

  const createBook = ({ bookName, id, image, information, publishingHouse, author, dateBirth, rating}) => {
    return {
      id,
      image,
      information,
      bookName,
      publishingHouse,
      author,
      dateBirth,
      rating,
      imgLoaded: false,
      visible: new Map([[TYPE_FILTER_DEFAULT, true]])
    }
  };

  switch (action.type) {
    case FETCH_ADD_BOOKS:
      const {books} = action;
      arrayBooks = [ ...books.map(createBook)];
      filters = arrayBooks.reduce(addFilters, state.filters);
      filters.forEach(elem => {
        elem.options = Array.from(new Set(elem.options));
      });
      return {...state, arrayBooks, filters};
    case INCREASE_RATING:
      return {...state, arrayBooks: ratingChange()};
    case DECREASE_RATING:
      return {...state, arrayBooks: ratingChange()};
    case LOAD_PHOTO:
      const {id, blob} = action;
      const index = state.arrayBooks.findIndex(book => book.id === id);
      const length = state.arrayBooks.length;
      const elem = {...state.arrayBooks[index]};
      elem.image = URL.createObjectURL(blob);
      elem.imgLoaded = true;
      arrayBooks = [...state.arrayBooks.slice(0, index), elem, ...state.arrayBooks.slice(index + 1, length)];
      return {...state, arrayBooks};
    case SEARCH_BY_NAME:
      const {payload} = action;
      const findStr = payload.toLowerCase();
      arrayBooks = [...state.arrayBooks];
      arrayBooks.forEach(elem => {
        const name = elem.bookName.toLowerCase();
        elem.visible.set(TYPE_FILTER_INPUT_TEXT, (name.indexOf(findStr) !== -1));
      });
      return {...state, arrayBooks};
    case FILTER:
      const {typeFilter, value} = action;
      arrayBooks = [...state.arrayBooks];

      const filterBook = (book) => {
        const {publishingHouse, dateBirth, author} = book;
        const {year} = dateBirth;

        switch (typeFilter) {
          case TYPE_FILTER_PUBLISHING_HOUSE:
            book.visible.set(TYPE_FILTER_PUBLISHING_HOUSE, (value === ALL_VALUES || publishingHouse === value));
            break;
          case TYPE_FILTER_DATE_BIRTH_YEAR:
            book.visible.set(TYPE_FILTER_DATE_BIRTH_YEAR, (value === ALL_VALUES || year.toString() === value));
            break;
          case TYPE_FILTER_AUTHOR:
            book.visible.set(TYPE_FILTER_AUTHOR, (value === ALL_VALUES || author === value));
            break;
          default:
            break;
        }
      }

      arrayBooks.forEach(filterBook);
      return {...state, arrayBooks};

    default:
      return state;
  }
}

export default cardsBookReducer;