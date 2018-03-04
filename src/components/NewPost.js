import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Dropdown, Item, Icon, Container, Segment } from 'semantic-ui-react';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom'

import * as ReadableAPIUtil from '../utils/api'



class NewPost extends Component {

  state = {}

  render() {
    return (
      <div>
        <p>New Post</p>
      </div>
    );
  }
}


/*
function mapStateToProps({ NewPost, comment, category }) {
  return {
    category,
    NewPost
  }
}

const mapDispatchToProps = dispatch => ({
  boundGetAllNewPost: () => dispatch(GetAllNewPost()),
  boundFilterNewPost: (category) => dispatch(filterNewPost(category))
});
*/
export default connect(null, null)(NewPost);

