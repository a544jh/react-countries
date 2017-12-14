import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CountryList from "./CountryList.js";
import CountryDetails from "./CountryDetails.js";
import { getCountries } from "./CoutriesApi.js";

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
          <Route path="/:code" component={this.findCountryByCode} />
        </Switch>
      </Router>
    );
  }

  findCountryByCode = ({ match, history }) => {
    const country = this.state.countries.find(
      c => match.params.code === c.alpha3Code.toLowerCase()
    );
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
