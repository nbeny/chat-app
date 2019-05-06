import React, { Component } from 'react'
import Layout from './components/Layout'
import './style/index.css'
import './style/style.css'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Layout title="Matchact" />
      </div>
    )
  }
};

export default App;
