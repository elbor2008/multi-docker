import React, { Component } from 'react'
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexs: [],
    values: {},
    index: ''
  }
  async fetchIndexs() {
    try {
      const seenIndexs = await axios.get('/api/values/all');
      this.setState({ seenIndexs: seenIndexs.data });
    } catch (error) {
      console.log(error);
    }
  }
  async fetchValues() {
    try {
      const values = await axios.get('/api/values/current');
      this.setState({ values: values.data });
    } catch (error) {
      console.log(error);
    }
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
  randerSeenIndex() {
    if (this.state.seenIndexs.length > 0) {
      const indexs = this.state.seenIndexs.map(({ number }) => number);
      return indexs.join(', ');
    }
    return '';
  }
  handleSubmit = async event => {
    event.preventDefault();
    await axios.post('/api/values', { index: this.state.index });
    this.setState({ index: '' });
  }
  componentDidMount() {
    // this.fetchIndexs();
    // this.fetchValues();
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
            this.randerSeenIndex()
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