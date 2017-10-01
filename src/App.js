import React, { Component } from "react";
import "./App.css";
import UshpizinDisplay from "./UshpizinDisplay";
import Hebcal from "hebcal";
const initialString = "אברהם";
const afterString = "לשנה הבאה בירושלים";
const hc = new Hebcal();
const ushpizinList = ["אברהם", "יצחק", "יעקב", "משה", "אהרן", "יוסף", "דוד"];
let succosIsOrWas = false;

function setHebcalLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      hc.setLocation(position.coords.latitude, position.coords.longitude);
    });
  }
}

setHebcalLocation();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuest: initialString
    };
  }

  getCurrentGuest() {
    let guest;
    let today = hc.find("today")[0];
    let succos = hc.find("succos");
    let index;

    index = succos.findIndex(day => {
      return (
        day.day === today.day &&
        day.month === today.month &&
        day.year === today.year
      );
    });

    if (index > 0 && index < 7) {
      succosIsOrWas = true;
      guest = ushpizinList[index];
    } else {
      guest = succosIsOrWas ? afterString : initialString;
    }
    return guest;
  }

  componentDidMount() {
    let intervalId = setInterval(this.updateUshpizinIfChanged.bind(this), 5000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  updateUshpizinIfChanged() {
    let currentGuest = this.getCurrentGuest();
    if (this.state.currentGuest !== currentGuest)
      this.setState({ currentGuest: currentGuest });
  }

  render() {
    return (
      <div className="App">
        <UshpizinDisplay currentGuest={this.state.currentGuest} />
      </div>
    );
  }
}

export default App;
