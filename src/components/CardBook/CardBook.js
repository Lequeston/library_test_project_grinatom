import React from "react";
import {connect, useDispatch} from 'react-redux'

import "./CardBook.scss";
import {decreaseRating, increaseRating, loadPhoto, addChosen, deleteChosen} from "../../redux/action";

const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Майя",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря"
];

const states = {
  name: "Название:",
  info: "Информация:",
  dom: "Издательство:",
  auth: "Автор:",
  date: "Дата создания:",
  rat: "Рейтинг:"
}
const CardBook = ({ book, increaseRating, decreaseRating, deleteChosen, addChosen}) => {
  const {image, information, bookName, publishingHouse, author, id, dateBirth, rating, imgLoaded, isChosen} = book;
  const dispatch = useDispatch();

  const getImage = () => {
    if (imgLoaded){
      return image;
    } else {
      dispatch(loadPhoto(id, image));
      return "";
    }
  }

  const buttonChosen = (!isChosen)
    ? <button type="button" className="btn btn-secondary" onClick={() => addChosen(id)}>Доавить в избранное</button>
    : <button type="button" className="btn btn-secondary" onClick={() => deleteChosen(id)}>Удалить из избранного</button>;

  return (
    <div className="col mb-4">
      <div className="card h-100">
        <img src={getImage()} className="card-img-top card-book-image" alt="loaded"/>
        <div className="card-body">
          <h5 className="card-title">{`${states.name} ${bookName}`}</h5>
          <p className="card-text">{`${states.info} ${information}`}</p>
          <p className="card-text">{`${states.dom} ${publishingHouse}`}</p>
          <p className="card-text">{`${states.auth} ${author}`}</p>
          <p className="card-text">{`${states.date} ${dateBirth.day} ${months[dateBirth.month - 1]} ${dateBirth.year}`}</p>
          <p className="card-text">{`${states.rat} ${rating}`}</p>
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" onClick={() => decreaseRating(id)}>-</button>
            <button type="button" className="btn btn-secondary" onClick={() => increaseRating(id)}>+</button>
          </div>
          {buttonChosen}
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  increaseRating, decreaseRating, addChosen, deleteChosen
}

export default connect(null, mapDispatchToProps)(CardBook);