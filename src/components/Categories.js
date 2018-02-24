import React, { Component } from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import { setActiveCategory } from '../actions'

import * as ReadableAPIUtil from '../utils/api'
import { connect } from 'react-redux';

class Categories extends Component {
  state = {
    categories :[]
  };

  updateSelectedCategory = (activeCategory) => {
    this.props.boundSetActiveCategory(activeCategory)
  }


  componentDidMount() {
    ReadableAPIUtil.getCategories().then((categories) => this.setState({ categories }));
  }

  render() {
    const { category } = this.props;
    const {categories} = this.state;
    const displayCategories = [{ name:'All',path:'All'}].concat(categories);
    return (
      <div>
           <Menu inverted>
  


           {displayCategories.map((myCategory, i) =>
         <Menu.Item  key={i} name={myCategory.name} active={category.name === myCategory.name} 
         onClick={ (event) => this.updateSelectedCategory(myCategory)}/>            )}
           </Menu>
      </div>
    );
  }
}


function mapStateToProps ({ post, comments, category }) {
   return{
    category
   }
}

const mapDispatchToProps = dispatch => ({
  boundSetActiveCategory : (category) => dispatch(setActiveCategory(category))
});


export default connect(mapStateToProps,mapDispatchToProps)(Categories);

