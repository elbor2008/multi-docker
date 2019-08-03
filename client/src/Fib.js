import React, { Component } from 'react'
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexs: [],
    values: {},
    index: ''
  }
  async fetchIndexs() {
    const seenIndexs = await axios.get('/api/values/all');
    this.setState({ seenIndexs: seenIndexs.data });
  }
  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }
  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }
  handleSubmit = async event => {
    event.preventDefault();
    await axios.post('/api/values', { index: this.state.index });
    this.setState({ index: '' });
  }
  componentDidMount() {
    this.fetchIndexs();
    this.fetchValues();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index: </label>
          <input value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })} />
          <button>Submit</button>
          <h3>Indexs I have seen: </h3>
          {
            this.state.seenIndexs.map(({ number }) => number).join(', ')
          }
          <h3>Calculated Values: </h3>
          {
            this.renderValues()
          }
        </form>
      </div>
    );
  }
}

export default Fib;