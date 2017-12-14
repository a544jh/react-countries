import React, { Component } from "react";
import { Link } from "react-router-dom";

class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "name",
      englishOnly: false
    };
  }

  render() {
    let countries = [...this.props.countries];
    const { sortKey, englishOnly } = this.state;
    countries.sort(sortByKeyFn(sortKey));
    if (englishOnly) countries = countries.filter(speaksEnglish);

    return (
      <div>
        <this.FilterButtons />
        <ul>{countries.map(this.CountryListItem)}</ul>
      </div>
    );
  }

  FilterButtons = () => (
    <div>
      <button onClick={() => this.setState({ sortKey: "name" })}>
        Sort by name
      </button>
      <button onClick={() => this.setState({ sortKey: "population" })}>
        Sort by population
      </button>
      <button onClick={() => this.setState({ sortKey: "area" })}>
        Sort by area
      </button>
      <label>
        <input type="checkbox" onChange={this.handleCheckbox.bind(this)} />
        Only english speaking countries
      </label>
    </div>
  );

  handleCheckbox = event => {
    this.setState({ englishOnly: event.target.checked });
  };

  CountryListItem = country => (
    <li key={country.name}>
      <Link to={`/${country.alpha2Code}`}>{country.name}</Link>
    </li>
  );
}

const speaksEnglish = country =>
  country.languages.find(l => l.iso639_1 === "en");

const sortByKeyFn = key => {
  return (a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  };
};

export default CountryList;
