import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import { setActiveCategory } from '../actions'

import * as ReadableAPIUtil from '../utils/api'
import { connect } from 'react-redux';

class Categories extends Component {
  state = {
    activeCategory: 'All'
  };

  updateSelectedCategory = (activeCategory) => {
    this.props.boundSetActiveCategory(activeCategory)
  }


  componentDidMount() {
    ReadableAPIUtil.getCategories().then((categories) => this.setState({ categories }));
  }



  render() {
    const { category } = this.props;
    const { categories } = this.state;
    const displayCategories = [{ name: 'All', path: 'All' }].concat(categories);
    return (
      <div>
        <Menu inverted>
          {displayCategories.map((myCategory, index) =>
            <Menu.Item key={index} name={myCategory.name} active={category.name === myCategory.name}
              onClick={(event) => this.updateSelectedCategory(myCategory)} />)}
        </Menu>
        <p><button onClick={() => this.props.changePage()}>New Post</button></p>

      </div>
    );
  }
}


function mapStateToProps({ routing, post, comments, category }) {
  return {
    category
  }
}

/*
const mapDispatchToProps = dispatch => ({
  boundSetActiveCategory : (category) => dispatch(setActiveCategory(category)),
  changePage: () => dispatch(push('/post'))

});
*/
const mapDispatchToProps = dispatch => bindActionCreators({
  boundSetActiveCategory: (category) => setActiveCategory(category),
  changePage: () => push('/post')
}, dispatch)



export default connect(
  mapStateToProps,
  mapDispatchToProps)(Categories);

