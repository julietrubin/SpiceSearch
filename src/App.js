import React from "react";

import SelectedSpices from "./SelectedSpices";
import Suggestions from "./Suggestions.js";
import { SPICE_SUGGESTIONS, ALPHA_REGEX } from "./constants.js";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      selectedSpices: [],
      suggestionIndex: null,
      suggestedSpices: []
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteSelectedSpices = this.handleDeleteSelectedSpices.bind(
      this
    );
    this.handleOnClickSuggestion = this.handleOnClickSuggestion.bind(this);
  }

  handleOnClickSuggestion(spice) {
    this.setState({
      selectedSpices: [...this.state.selectedSpices, spice],
      current: "",
      suggestionIndex: null,
      suggestedSpices: []
    });
  }

  handleOnChange(event) {
    let current = event.target.value;
    // only allow alphanumeric characters
    current = current.replace(ALPHA_REGEX, "");
    let suggestedSpices = SPICE_SUGGESTIONS.filter((spice) =>
      spice.toLowerCase().startsWith(current.toLowerCase())
    );
    this.setState({
      current,
      suggestionIndex: null,
      suggestedSpices
    });
  }

  handleKeyEnter(event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    // either a suggested item or not
    let current =
      this.state.suggestionIndex === null
        ? event.target.value
        : this.state.suggestedSpices[this.state.suggestionIndex];

    if (current !== "") {
      // must not be empty
      this.setState({
        selectedSpices: [...this.state.selectedSpices, current],
        current: "",
        suggestionIndex: null,
        suggestedSpices: []
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
      } else if (suggestionIndex < this.state.suggestedSpices.length) {
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

  handleDeleteSelectedSpices(index) {
    let list = this.state.selectedSpices;
    list.splice(index, 1);
    this.setState({ selectedSpices: list });
  }

  render() {
    return (
      <div className="App">
        <SelectedSpices
          selectedSpices={this.state.selectedSpices}
          handleDeleteSelectedSpices={this.handleDeleteSelectedSpices}
        />
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
        <Suggestions
          current={this.state.current}
          suggestedSpices={this.state.suggestedSpices}
          suggestionIndex={this.state.suggestionIndex}
          handleOnClickSuggestion={this.handleOnClickSuggestion}
        />
      </div>
    );
  }
}

export default App;
