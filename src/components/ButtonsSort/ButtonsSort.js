import React from "react";
import {connect} from 'react-redux';

import "./ButtonsSort.scss";
import ButtonSort from "../ButtonSort";

const ButtonsSort = ({sorts}) => {
  return sorts.map(({name, isSortAscending, isAdapt, type}, index) => <ButtonSort
    name={name}
    isSortAscending={isSortAscending}
    isAdapt={isAdapt}
    type={type}
    key={index}
    />
  );
}

const mapStateToProps = state => ({
  sorts: state.arrayBooks.sorts
})

export default connect(mapStateToProps, null)(ButtonsSort);