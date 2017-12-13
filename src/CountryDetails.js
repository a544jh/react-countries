import React, { Component } from "react";
import { Link } from "react-router-dom";

class CountryDetails extends Component {
  render() {
    const country = this.props.country;
    return (
      <div>
        <Link to="/">Back to all countries</Link>
        <h1>{country.name}</h1>
      </div>
    );
  }
}

export default CountryDetails;
