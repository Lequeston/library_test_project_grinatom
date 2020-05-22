import React from "react";
import CardBook from "../CardBook";
import {useSelector, useDispatch} from "react-redux";
import "./CardsBook.scss";
import {fetchAddBooks} from "../../redux/action";

const isVisible = (visible) => {
  let res = true;
  for(const value of visible.values()) {
    res = res && value;
  }
  return res;
}

const CardsBook = () => {
  const dispatch = useDispatch();
  const arrayBooks = useSelector(state => state.arrayBooks.arrayBooks);
  if (!arrayBooks.length) {
    dispatch(fetchAddBooks());
    return <p className="text-center">Книг пока нет</p>
  }

  return arrayBooks.map(book => isVisible(book.visible) && <CardBook book={book} key={book.id}/>)
}

export default CardsBook;