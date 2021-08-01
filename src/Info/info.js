import React, {Component} from "react";

class Info extends Component {
  state = {
    value:      "Test value",
    width:      0,
    inputValue: ''
  };

  componentDidMount() {
    this.handleChangeTitle();
    window.addEventListener("resize", this.handleWidth);
  }

  componentDidUpdate() {
    this.handleChangeTitle();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWidth);
  }

  handleChangeTitle = () => {
    document.title = this.state.value;
  };

  handleWidth = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  render() {
    return <> <h1>{this.state.width}
    </h1>
      <input
        onChange={e => this.setState({inputValue: e.target.value})}
        value={this.state.inputValue}
        type="text"/>
      ---------------
    <input
      onChange={e => this.setState({inputValue2: e.target.value})}
      value={this.state.inputValue2}
      type="text"/>
  </>
  }
}

export default Info;
