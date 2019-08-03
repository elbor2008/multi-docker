import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/otherpage">Other Page</Link>
      <div>
        <Route exact path="/" component={Fib} />
        <Route exact path="/otherpage" component={OtherPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
