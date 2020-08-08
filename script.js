//A lot of this code was at the very least heavily inspired by the example given by freeCodeCamp @ https://codepen.io/freeCodeCamp/full/MJyNMd

let soundBank = [{
  key: "Q",
  keyCode: 81,
  id: "Heater-1",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  key: "W",
  keyCode: 87,
  id: "Heater-2",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  key: "E",
  keyCode: 69,
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  key: "A",
  keyCode: 65,
  id: "Heater-4",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  key: "S",
  keyCode: 83,
  id: "Clap",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  key: "D",
  keyCode: 68,
  id: "Open-HH",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  key: "Z",
  keyCode: 90,
  id: "Kick-n-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  key: "X",
  keyCode: 88,
  id: "Kick",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  key: "C",
  keyCode: 67,
  id: "Closed HH",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];


class Pads extends React.Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
  handleKey(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  playSound(event) {
    const sound = document.getElementById(this.props.keyName);
    sound.play();
    sound.currentTime = 0;
    this.props.updateDisplay(this.props.id);
  }
  render() {
    return (
      React.createElement("div", { id: this.props.id, onClick: this.playSound, className: "drum-pad btn btn-default" },
      this.props.keyName,
      React.createElement("audio", { className: "clip", id: this.props.keyName, src: this.props.url })));



  }}


class DrumPads extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let bank;
    bank = this.props.soundBank.map((obj, i, sound) => {
      return (
        React.createElement(Pads, {
          keyName: sound[i].key,
          keyCode: sound[i].keyCode,
          url: sound[i].url,
          id: sound[i].id,
          updateDisplay: this.props.updateDisplay }));

    });
    return (
      React.createElement("div", null,
      bank));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundBank: soundBank,
      display: "*silence*" };

    this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateDisplay(name) {
    this.setState({
      display: name });

  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine-container", class: "container-fluid" },
      React.createElement("div", { id: "drum-machine" },
      React.createElement("h1", { id: "display", class: "padName" }, this.state.display),
      React.createElement(DrumPads, { soundBank: this.state.soundBank, updateDisplay: this.updateDisplay })),

      React.createElement("div", { class: "footer" }, "by ",

      React.createElement("a", { href: "https://codepen.io/Busterfreeze/" }, "Zac L."))));




  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
