import React from "react";

import Spice from "./Spice.js";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { current: "",  spices: [""]};
    this.state = { current: "", spices: ["chai", "pumpkin"] };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
  }

  handleKeyPress(event) {
    if (event.charCode === 8) {
      // delete
      let current = event.target.value;
      this.setState({ current });
    }

    let current = event.target.value; //this.state.current +
    this.setState({ current });
    if (event.charCode === 13) {
      // enter
      this.setState({ spices: [...this.state.spices, current] });
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
    alert(index);
    this.setState({ spices: this.state.spices.splice(index, 1) });
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
              value={this.state.value}
              onKeyPress={this.handleKeyPress}
            ></input>
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
    );
  }
}

export default App;
