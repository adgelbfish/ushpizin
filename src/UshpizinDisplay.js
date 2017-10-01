import React, { Component } from "react";
import "./UshpizinDisplay.css";

class UshpizinDisplay extends Component {
  render() {
    return (
      <div className="UshpizinDisplay UshpizinDisplay-overlay">
        <div className="UshpizinDisplay-MakabiYG-font UshpizinDisplay-guest">
          {this.props.currentGuest}
        </div>
        ushpizin switch time not to be relied upon for zman shkia
      </div>
    );
  }
}

export default UshpizinDisplay;
