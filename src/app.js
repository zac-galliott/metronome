import React from "react";
import "./index.css";
import click1 from "./audio/click1.wav";
import click2 from "./audio/click2.wav";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempo: 100,
      beatsInBar: 4,
      isTicking: false,
      count: 0,
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.handleStartStopButton = this.handleStartStopButton.bind(this);
    this.playClick = this.playClick.bind(this);
  }

  handleBPMChange(slider) {
    const bpm = slider.target.value

    this.setState({
      tempo: bpm
    })

    if (this.state.isTicking) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
    }
  }

  handleStartStopButton() {
    if (this.state.isTicking) {
      clearInterval(this.timer);
      this.setState({
        count: 0,
        isTicking: false
      })
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.tempo) * 1000);

      this.setState({
        isTicking: true,
      })

      this.playClick()
    }
  }

  playClick() {
    const { count, beatsInBar } = this.state;

    if (count % beatsInBar === 0) {
      this.click2.play()
    } else {
      this.click1.play()
    }

    this.setState({
      count: (this.state.count + 1) % this.state.beatsInBar
    })
  }

  render() {
    const min = "30";
    const max = "375";
    const bpm = this.state.tempo;
    const buttonText = this.state.isTicking === true ? "Stop" : "Start";
    const imagePath = "/images/" + (this.state.count % 2 === 0 ? "metronomeright" : "metronomeleft") + ".png";

    return (
      <div className="middleOfSuper content">
        <input id="bpmLabel" type="text" value={bpm} onChange={this.handleBPMChange} /> <label> BPM </label> <br />
        <input id="bpmSlider" type="range" value={bpm} min={min} max={max} onChange={this.handleBPMChange} /><br />
        <button onClick={this.handleStartStopButton} id="startButton"> {buttonText} </button><br />
        <img id="metronomeImage" src={imagePath} alt="metronome"></img>
      </div>
    )
  }
}
