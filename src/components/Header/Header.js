import React from "react";
import {connect} from 'react-redux'
import {searchByName} from "../../redux/action";

const Header = ({ searchByName }) => {
  const changeInputHandler = (e) => {
    searchByName(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Lequeston</a>
      <input className="form-control" type="text" placeholder="Поиск" onChange={changeInputHandler}/>
    </nav>
  )
}

const mapDispatchToProps = {
  searchByName
}

export default connect(null, mapDispatchToProps)(Header);