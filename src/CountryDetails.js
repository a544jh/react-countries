import React, { Component } from "react";

class CountryDetails extends Component {
  render() {
    const country = this.props.country;
    return (
      <div>
        <h1>{country.name}</h1>
      </div>
    );
  }
}

export default CountryDetails;
