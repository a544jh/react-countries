import React, { Component } from "react";
import { Link } from "react-router-dom";

class CountryList extends Component {
  render() {
    const countries = this.props.countries;
    return <ul>{countries.map(countryListItem)}</ul>;
  }
}

const countryListItem = c => {
  return (
    <li key={c.name}>
      <Link to={`/${c.alpha2Code}`}>{c.name}</Link>
    </li>
  );
};

export default CountryList;
