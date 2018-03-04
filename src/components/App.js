import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

import Posts from './Posts';
import NewPost from './NewPost';
import Categories from './Categories';
class App extends Component {
  render() {
    return (

      <div>
            <Route exact path='/' component={Posts} />
          <Route exact path='/post' component={NewPost} />
        <Container style={{ margin: '0em 0em 0em', padding: '1em 0em' }}>
      
        </Container>
        <Segment inverted vertical style={{ margin: '1em 0em 0em', padding: '1em 0em' }}>
          <Container textAlign='center'></Container>
        </Segment>
      </div>


    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(null, mapDispatchToProps)(App);
