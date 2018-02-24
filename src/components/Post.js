import React, { Component } from 'react';
import logo from './logo.svg';
import './Post.css';

class Post extends Component {
  render() {
    return (
      <div className="Post">
        <header className="Post-header">
          <img src={logo} className="Post-logo" alt="logo" />
          <h1 className="Post-title">Welcome to React</h1>
        </header>
        <p className="Post-intro">
          To get started, edit <code>src/Post.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Post;
