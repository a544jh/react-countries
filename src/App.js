import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CountryList from "./CountryList.js";
import CountryDetails from "./CountryDetails.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      text: "Hello World!"
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
            <CountryList countries={countries} />
          </Route>
          <Route path="/:code" component={this.countryByCode} />
        </Switch>
      </Router>
    );
  }

  countryByCode = ({ match, history }) => {
    const country = this.state.countries.find(
      c => match.params.code === c.alpha2Code
    );
    if (!country) {
      history.push("/");
      return null;
    }
    return <CountryDetails country={country} />;
  };

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all").then(resp => {
      resp.json().then(c => this.setState({ countries: c }));
    });
  }
}

export default App;
