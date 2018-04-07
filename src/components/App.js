import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { GetAllPosts } from '../middleware/posts';
import { GetAllGategories } from '../middleware/categories';


import { Switch,Route } from 'react-router-dom'
import { withRouter } from 'react-router';
import { push } from 'react-router-redux'

import 'semantic-ui-css/semantic.min.css';

import { Container, Image, Segment,List } from 'semantic-ui-react'

import Categories from './Categories';
import Posts from './Posts';
import PostDetails from './PostDetails';
import {Error} from './Loader';
import logo from '../images/logo.png'
import PostForm from './PostForm';


class App extends Component {

  componentDidMount() {
    this.props.boundGetAllPosts();
    this.props.boundGetAllGategories();
  }  
  render() {
    return (
      <div>
        <Categories/>
        <Container text style={{ marginTop: '5em' }}>
          <Switch>
              <Route exact path='/' component={Posts} />
              <Route exact path='/new_post' component={PostForm} />
              <Route exact path='/:category' component={Posts} />
              <Route exact path="/:category/:id/edit" component={PostForm}/>
              <Route exact path="/:category/:id" component={PostDetails}/>
              <Route exact path='/error' component={Error} /> 
            </Switch>
        </Container>
        <Segment inverted vertical style={{ margin: '1em 0em 0em', padding: '1em 0em' }}>
          <Container textAlign='center'>
            <Image
              centered
              size='mini'
              src={logo}
            />
            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
    </div>
    

    );
  }
}


function mapStateToProps({ post, category, hasErrored, isLoading }) {
  return {
    hasErrored
  }
}




const mapDispatchToProps = dispatch => bindActionCreators({
  changePageTo: (page) => push(page),
  boundGetAllPosts: () => GetAllPosts(),
  boundGetAllGategories: () => GetAllGategories(),

}, dispatch)


export default withRouter((connect(mapStateToProps,mapDispatchToProps)(App)));
