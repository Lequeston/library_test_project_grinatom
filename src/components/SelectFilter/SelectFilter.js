import React from "react";

import "./SelectFilter.scss";
import {connect} from "react-redux";
import { filter } from "../../redux/action";

const SelectFilter = ({ name, options, type, filter }) => {
  const inputSelect = (e) => {
    filter(type, e.target.value);
  }
  return(
    <div className="flex-fill input-group">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor={type}>{name}</label>
      </div>
      <select className="custom-select" id={type} onChange={inputSelect}>
        <Options options={options} />
      </select>
    </div>
  );
}

const Options = ({ options }) => {
  return options.map(name => <option value={name} key={name}>{name}</option>)
}

const mapDispatchToProps = {
  filter
}

export default connect(null, mapDispatchToProps)(SelectFilter);