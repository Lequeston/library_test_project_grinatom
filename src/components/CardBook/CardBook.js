import React from "react";
import {connect, useDispatch} from 'react-redux'

import "./CardBook.scss";
import {decreaseRating, increaseRating, loadPhoto} from "../../redux/action";


const CardBook = ({ book, increaseRating, decreaseRating }) => {
  const {image, information, bookName, publishingHouse, author, id/*, dateBirth*/, rating, imgLoaded} = book;
  const dispatch = useDispatch();

  const getImage = () => {
    if (imgLoaded){
      return image;
    } else {
      dispatch(loadPhoto(id, image));
      return "";
    }
  }

  return (
    <div className="col mb-4">
      <div className="card h-100">
        <img src={getImage()} className="card-img-top card-book-image" alt="loaded"/>
        <div className="card-body">
          <h5 className="card-title">{bookName}</h5>
          <p className="card-text">{information}</p>
          <p className="card-text">{publishingHouse}</p>
          <p className="card-text">{author}</p>
          <p className="card-text">{rating}</p>
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" onClick={() => decreaseRating(id)}>-</button>
            <button type="button" className="btn btn-secondary" onClick={() => increaseRating(id)}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  increaseRating, decreaseRating
}

export default connect(null, mapDispatchToProps)(CardBook);