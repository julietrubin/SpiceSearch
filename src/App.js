import React from "react";

import Spice from "./Spice.js";
import "./styles.css";

const ALPHA_REGEX = /[^A-Za-z]/g;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: "", spices: [] };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
  }

  handleOnChange(event) {
    let current = event.target.value;
    // only allow alphanumeric characters
    current = current.replace(ALPHA_REGEX, "");
    this.setState({ current });
  }

  handleKeyPress(event) {
    let current = event.target.value;
    if (event.charCode === 13) {
      // enter
      if (current) {
      }
      this.setState({
        spices: [...this.state.spices, current],
        current: ""
      });
      event.preventDefault();
    }
    if (event.charCode === 40) {
      // down
    }
    if (event.charCode === 38) {
      // up
    }
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
              onKeyPress={this.handleKeyPress}
              onChange={this.handleOnChange}
            ></input>
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
    );
  }
}

export default App;
