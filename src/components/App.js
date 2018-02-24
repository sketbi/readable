import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import Categories from './Categories'
import Posts from './Posts';


class App extends Component {
  render() {
    return (
      <div>

        <Categories />

        <Container text style={{ marginTop: '7em' }}>
            <Posts/>
        </Container>

        <Segment
          inverted
          vertical
          style={{ margin: '1em 0em 0em', padding: '1em 0em' }}
        >
          <Container textAlign='center'>
          
        </Container>
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
