import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { GetAllPosts,GetAllGategories } from '../actions';


import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import { push } from 'react-router-redux'

import 'semantic-ui-css/semantic.min.css';

import { Container, Header, Image, Menu, Segment,Button,List } from 'semantic-ui-react'

import Posts from './Posts';
import NewPost from './NewPost';
import PostDetails from './PostDetails';
import Error from './Error'
import logo from '../images/logo.png'

class App extends Component {



  componentDidMount() {
    this.props.boundGetAllPosts();
    this.props.boundGetAllGategories();
  }


  
  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='h3' header>
              <Image
                size='mini'
                src={logo}
                style={{ marginRight: '1.5em' }}
              />
              Readable By Udacity
            </Menu.Item>
            <Menu.Item as='a' onClick={() => this.props.changePageTo('/')}>Home</Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item as='a' >
                <Button  primary onClick={() => this.props.changePageTo('/new_post')}>Add Post</Button>
                </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>

      <Container text style={{ marginTop: '5em' }}>
          <Route exact path='/' component={Posts} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/new_post' component={NewPost} />
          <Route exact path="/posts/:id" component={PostDetails}/>
          <Route exact path='/error' component={Error} />        
      </Container>

      <Segment
        inverted
        vertical
        style={{ margin: '1em 0em 0em', padding: '1em 0em' }}
      >
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


function mapStateToProps({ post, comment, category, hasErrored, isLoading }) {
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
