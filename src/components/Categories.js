import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Container, Image, Menu,Button } from 'semantic-ui-react'
import logo from '../images/logo.png'





class Categories extends Component {

  routeCategoryPosts = (e,category) => {
    if(category){
      this.props.changePageTo("/"+category.path);
    }else{
      this.props.changePageTo("/");
    }
  }

  render() {
    const categories = this.props.category;
    const routeCategory = (this.props.match.params.category) ? this.props.match.params.category : "All";
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
            {categories.map((myCategory, index) =>
            <Menu.Item key={index} name={myCategory.name} active={routeCategory === myCategory.path}
            onClick={(event) => this.routeCategoryPosts(event, myCategory)} />)}

            <Menu.Menu position='right'>
                <Menu.Item as='a' >
                <Button  primary onClick={() => this.props.changePageTo('/new_post')}>Add Post</Button>
                </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ post, category, hasErrored, isLoading }) {
  return {
    category
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePageTo: (page) => push(page),
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));


