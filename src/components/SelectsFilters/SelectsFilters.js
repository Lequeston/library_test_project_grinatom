import React from "react";

import {connect} from 'react-redux'
import SelectFilter from "../SelectFilter";

const SelectsFilters = ({ filters }) => {
  return (
    <div className="d-flex">
      <Selects filters={filters} />
    </div>
  )
}

const Selects = ({ filters }) => {
  return filters.map(({ name, options, type}) => <SelectFilter name={name} options={options} type={type} key={type}/>);
}

const mapStateToProps = state => ({
  filters: state.arrayBooks.filters
})

export default connect(mapStateToProps, null)(SelectsFilters);