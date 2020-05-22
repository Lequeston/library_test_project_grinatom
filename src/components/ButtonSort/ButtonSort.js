import React from "react";
import {sortBooks} from "../../redux/action";
import {connect} from 'react-redux'
import "./ButtonSort.scss"

const styles = ["btn", ["btn-secondary"]];
const ButtonSort = ({name, isAdapt, type, sortBooks}) => {
  if (!isAdapt){
    styles.push("disabled");
  }
  const className = styles.join(" ");
  return <button type="button" className={className} onClick={() => sortBooks(type)}>{name}</button>
}

const mapDispatchToProps = {
  sortBooks
}

export default connect(null, mapDispatchToProps)(ButtonSort);