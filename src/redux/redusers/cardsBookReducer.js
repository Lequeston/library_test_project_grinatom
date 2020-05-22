import {
  DECREASE_RATING,
  FETCH_ADD_BOOKS,
  FILTER,
  INCREASE_RATING,
  LOAD_PHOTO,
  SEARCH_BY_NAME,
  TYPE_FILTER_AUTHOR,
  TYPE_FILTER_DATE_BIRTH_YEAR,
  TYPE_FILTER_DEFAULT,
  TYPE_FILTER_INPUT_TEXT,
  TYPE_FILTER_PUBLISHING_HOUSE,
  TYPE_SORT_ALPHABET,
  TYPE_SORT_RATING,
  SORT_ARRAY,
  TYPE_SORT_DATE,
  ADD_CHOSEN,
  ARRAY_CHOSEN, DELETE_CHOSEN, VIEW_CHOSEN, TYPE_FILTER_IS_CHOSEN
} from "../types";

const ALL_VALUES = "Всё";

const initialState = {
  arrayBooks: [],
  arrayChosen: [],
  isChosen: false,
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
  ],
  sorts: [
    {
      name: "По дате",
      isSortAscending: false,
      isAdapt: false,
      type: TYPE_SORT_DATE
    },
    {
      name: "По алфавиту",
      isSortAscending: false,
      isAdapt: false,
      type: TYPE_SORT_ALPHABET
    },
    {
      name: "По рейтингу",
      isSortAscending: false,
      isAdapt: true,
      type: TYPE_SORT_RATING
    }
  ]
}

const cardsBookReducer = (state = initialState, action) => {
  let arrayBooks, filters, sorts, arrayChosen, str, elem;

  const reverse = (flag, value) => {
    return (flag) ? value : -value;
  }

  const sortAlphabet = (first, second) => {
    const elem = state.sorts.find(({type}) => type === TYPE_SORT_ALPHABET);
    const flag = elem.isSortAscending;
    const a = first.bookName.toLowerCase();
    const b = second.bookName.toLowerCase();
    if (a === b){
      return 0;
    } else {
      let length = Math.min(a.length, b.length);
      for (let i = 0; i < length; i++){
        if (a[i] > b[i]) {
          return reverse(flag, -1);
        } else if (a[i] < b[i]){
          return reverse(flag, 1);
        }
      }
      if (a.length < b.length){
        return reverse(flag, -1);
      } else {
        return reverse(flag, 1);
      }
    }
  }

  const sortRating = (first, second) => {
    const a = first.rating;
    const b = second.rating;
    const elem = state.sorts.find(({type}) => type === TYPE_SORT_RATING);
    const flag = elem.isSortAscending;
    return reverse(flag, a - b);
  }

  const sortDate = (first, second) => {
    const elem = state.sorts.find(({type}) => type === TYPE_SORT_DATE);
    const flag = elem.isSortAscending;
    const a = new Date(first.dateBirth.year, first.dateBirth.month, first.dateBirth.day);
    const b = new Date(second.dateBirth.year, second.dateBirth.month, second.dateBirth.day);
    return reverse(flag, b - a);
  }

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
      isChosen: false,
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
      arrayBooks.sort(sortRating);
      str = localStorage.getItem(ARRAY_CHOSEN);
      if (str) {
        arrayChosen = JSON.parse(str);
      } else {
        arrayChosen = [];
      }
      arrayChosen.forEach(elem => (arrayBooks.find(({id}) => id === elem)).isChosen = true);
      arrayChosen = Array.from(new Set(arrayChosen));
      return {...state, arrayBooks, filters, arrayChosen};
    case INCREASE_RATING:
      arrayBooks = ratingChange()
      if ((state.sorts.find(({type}) => type === TYPE_SORT_RATING)).isAdapt)
        arrayBooks.sort(sortRating);
      return {...state, arrayBooks };
    case DECREASE_RATING:
      return {...state, arrayBooks: ratingChange()};
    case LOAD_PHOTO:
      const {id, blob} = action;
      const index = state.arrayBooks.findIndex(book => book.id === id);
      const length = state.arrayBooks.length;
      elem = {...state.arrayBooks[index]};
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

    case SORT_ARRAY:
      const {typeSort} = action;
      arrayBooks = [...state.arrayBooks];
      const dropping = (type) => {
        return state.sorts.map((elem) => {
          let res = {...elem};
          if (type === elem.type){
            if (res.isAdapt){
              res.isSortAscending = !res.isSortAscending;
            } else {
              res.isAdapt = true;
            }
          } else {
            res.isAdapt = false;
          }
          return res;
        });
      }
      sorts = dropping(typeSort);
      switch (typeSort) {
        case TYPE_SORT_ALPHABET:
          arrayBooks.sort(sortAlphabet);
          break;
        case TYPE_SORT_DATE:
          arrayBooks.sort(sortDate);
          break;
        case TYPE_SORT_RATING:
          arrayBooks.sort(sortRating);
          break;
        default:
          break;
      }

      return {...state, arrayBooks, sorts }

    case ADD_CHOSEN:
      str = localStorage.getItem(ARRAY_CHOSEN);
      arrayBooks = [...state.arrayBooks];
      if (str) {
        arrayChosen = JSON.parse(str);
      } else {
        arrayChosen = [];
      }
      arrayChosen = [...arrayChosen, action.id];
      arrayChosen = Array.from(new Set(arrayChosen));
      localStorage.setItem(ARRAY_CHOSEN, JSON.stringify(arrayChosen));
      elem = arrayBooks.findIndex(({id}) => id === action.id);
      arrayBooks[elem] = {...arrayBooks[elem], isChosen: true};
      return {...state, arrayBooks, arrayChosen};

    case DELETE_CHOSEN:
      str = localStorage.getItem(ARRAY_CHOSEN);
      arrayBooks = [...state.arrayBooks];
      if (str) {
        arrayChosen = JSON.parse(str);
      } else {
        arrayChosen = [];
      }
      const i = arrayChosen.findIndex(elem => elem === action.id);
      arrayChosen = [...arrayChosen.slice(0, i), ...arrayChosen.slice(i + 1, arrayChosen.length)];
      console.log(arrayChosen);
      localStorage.removeItem(ARRAY_CHOSEN);
      localStorage.setItem(ARRAY_CHOSEN, JSON.stringify(arrayChosen));
      elem = arrayBooks.findIndex(({id}) => id === action.id);
      arrayBooks[elem] = {...arrayBooks[elem], isChosen: false, visible: arrayBooks[elem].visible.set(TYPE_FILTER_IS_CHOSEN, (!state.isChosen || false))};
      return {...state, arrayBooks, arrayChosen};

    case VIEW_CHOSEN:
      const isChosen = !state.isChosen;
      arrayBooks = [...state.arrayBooks];
      arrayBooks.forEach(elem => {
        const chosen = elem.isChosen;
        elem.visible.set(TYPE_FILTER_IS_CHOSEN, (!isChosen || chosen));
      });
      return {...state, arrayBooks, isChosen}
    default:
      return state;
  }
}

export default cardsBookReducer;