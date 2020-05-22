import React from "react";
import {connect} from 'react-redux'
import {searchByName, viewChosen} from "../../redux/action";

const Header = ({ searchByName, viewChosen, isChosen }) => {
  const changeInputHandler = (e) => {
    searchByName(e.target.value);
  };
  const name = (!isChosen) ? "Избранное" : "Общее";
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Lequeston</a>
      <input className="form-control" type="text" placeholder="Поиск" onChange={changeInputHandler}/>
      <button type="button" className="btn btn-secondary" onClick={() => viewChosen()}>{name}</button>
    </nav>
  )
}

const mapDispatchToProps = {
  searchByName, viewChosen
}

const mapStateToProps = state => ({
  isChosen: state.arrayBooks.isChosen
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);