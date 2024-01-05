
import './App.css';

import React, { Component } from 'react'
import NavBar from './components.js/NavBar';
import News from './components.js/News';

export default class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <News />
      </div>
    )
  }
}



