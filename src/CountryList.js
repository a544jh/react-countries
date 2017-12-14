import React, { Component } from "react";
import { Link } from "react-router-dom";

class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "name"
    };
  }

  render() {
    const countries = [...this.props.countries];
    const { sortKey } = this.state;
    if (sortKey) countries.sort(sortByKeyFn(sortKey));

    return (
      <div>
        <button onClick={() => this.setSortKey("name")}>Sort by name</button>
        <button onClick={() => this.setSortKey("population")}>
          Sort by population
        </button>
        <button onClick={() => this.setSortKey("area")}>Sort by area</button>
        <ul>{countries.map(CountryListItem)}</ul>
      </div>
    );
  }

  setSortKey = key => {
    this.setState({ sortKey: key });
  };
}

const sortByKeyFn = key => {
  return (a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  };
};

const CountryListItem = country => {
  return (
    <li key={country.name}>
      <Link to={`/${country.alpha2Code}`}>{country.name}</Link>
    </li>
  );
};

export default CountryList;
