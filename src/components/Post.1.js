import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Dropdown, Item, Icon, Container, Segment } from 'semantic-ui-react';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom'

import * as ReadableAPIUtil from '../utils/api'



class Post extends Component {

  state = {}

  render() {
    return (
      <div>
        <p>Testing</p>
      </div>
    );
  }
}


/*
function mapStateToProps({ post, comment, category }) {
  return {
    category,
    post
  }
}

const mapDispatchToProps = dispatch => ({
  boundGetAllPost: () => dispatch(GetAllPost()),
  boundFilterPost: (category) => dispatch(filterPost(category))
});
*/
export default connect(null, null)(Post);

