import React, { Component } from "react";
import "./App.css";
import UshpizinDisplay from "./UshpizinDisplay";
import Hebcal from "hebcal";
const initialString = "אברהם";
const afterString = "לשנה הבאה בירושלים";
const hc = new Hebcal();

//from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const Avraham = "אברהם";
const Yitzchak = "יצחק";
const Yaakov = "יעקב";
const Moshe = "משה";
const Aharon = "אהרן";
const Yosef = "יוסף";
const David = "דוד";
const SfirosOrder = [
  Avraham,
  Yitzchak,
  Yaakov,
  Moshe,
  Aharon,
  Yosef,
  David
];
const ChronologicalOrder = [
  Avraham,
  Yitzchak,
  Yaakov,
  Yosef,
  Aharon,
  Moshe,
  David
];
const ushpizinList = getParameterByName("order") === "chronological"
  ? ChronologicalOrder
  : SfirosOrder;

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
