import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CountryList from "./CountryList.js";
import CountryDetails from "./CountryDetails.js";
import { getCountries, findCountryByCode } from "./CoutriesApi.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
  }

  render() {
    const countries = this.state.countries;
    if (!countries.length) {
      return <h1>Loading...</h1>;
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <CountryList {...{ countries }} />
          </Route>
          <Route path="/:code" component={this.findCountryDetails} />
        </Switch>
      </Router>
    );
  }

  findCountryDetails = ({ match, history }) => {
    // TODO: refactor way to get country link
    const country = findCountryByCode(match.params.code.toUpperCase());
    if (country === undefined) {
      history.push("/");
      return null;
    }
    return <CountryDetails {...{ country }} />;
  };

  componentDidMount() {
    getCountries().then(c => this.setState({ countries: c }));
  }
}

export default App;
