import React from "react";

import Spice from "./Spice.js";
import "./styles.css";
import { SPICE_SUGGESTIONS } from "./constants.js";

const ALPHA_REGEX = /[^A-Za-z]/g;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: "", spices: [], suggestionIndex: null };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
    this.handleOnClickSuggestion = this.handleOnClickSuggestion.bind(this);
  }

  handleOnClickSuggestion(spice) {
    this.setState({
      spices: [...this.state.spices, spice],
      current: "",
      suggestionIndex: null
    });
  }

  handleOnChange(event) {
    let current = event.target.value;
    // only allow alphanumeric characters
    current = current.replace(ALPHA_REGEX, "");
    this.setState({ current });
  }

  handleKeyEnter(event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    // either suggested item or our own item
    let current =
      this.state.suggestionIndex === null
        ? event.target.value
        : SPICE_SUGGESTIONS[this.state.suggestionIndex];

    if (current !== "") {
      // must not be empty
      this.setState({
        spices: [...this.state.spices, current],
        current: "",
        suggestionIndex: null
      });
    }
  }

  handleKeyUpAndDown(event) {
    if (event.keyCode !== 40 && event.keyCode !== 38) {
      return;
    }

    let suggestionIndex = this.state.suggestionIndex;
    if (event.keyCode === 40) {
      if (suggestionIndex === null) {
        suggestionIndex = 0;
      } else if (suggestionIndex < SPICE_SUGGESTIONS.length) {
        suggestionIndex++;
      }
    } else if (event.keyCode === 38 && suggestionIndex > 0) {
      suggestionIndex--;
    }
    this.setState({ suggestionIndex });
  }

  handleKeyDown(event) {
    this.handleKeyEnter(event);
    this.handleKeyUpAndDown(event);
  }

  handleSubmit(event) {
    // alert("A name was submitted: " + this.state.value);
    //event.preventDefault();
  }

  handleDeleteEntry(index) {
    let list = this.state.spices;
    list.splice(index, 1);
    this.setState({ spices: list });
  }

  render() {
    return (
      <div className="App">
        {this.state.spices.map((spice, index) => (
          <Spice
            key={index}
            name={spice}
            index={index}
            handleDeleteEntry={this.handleDeleteEntry}
          />
        ))}
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              className="search"
              value={this.state.current}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleOnChange}
            ></input>
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
        <ul className="suggestions">
          {SPICE_SUGGESTIONS.map((spice, index) => (
            <li
              onClick={() => this.handleOnClickSuggestion(spice)}
              className={this.state.suggestionIndex === index ? "selected" : ""}
            >
              {spice}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
