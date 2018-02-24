import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import { GetAllPosts, filterPosts } from '../actions'

import * as ReadableAPIUtil from '../utils/api'
import { connect } from 'react-redux';
import coverNotAvailable from'../images/media-paragraph.png';
class Posts extends Component {

  componentDidMount() {

  }

  render() {
    const { category, post } = this.props;
    if (this.props.category.name === 'All') {
      this.props.boundGetAllPosts();
    } else {
      this.props.boundFilterPosts(this.props.category.name);
    }
    return (
      <div>
        <h1>Number of match posts : {post.length}</h1>
        <Grid columns={1} divided>
           <Grid.Row>
           <Grid.Column>
             <Image src={coverNotAvailable} />
           </Grid.Column>
           <Grid.Column>
           <Image src={coverNotAvailable} />
           </Grid.Column>
           <Grid.Column>
           <Image src={coverNotAvailable} />
           </Grid.Column>
         </Grid.Row>
        </Grid>

      </div>
    );
  }
}


function mapStateToProps({ post, comment, category }) {
  return {
    category,
    post
  }
}

const mapDispatchToProps = dispatch => ({
  boundGetAllPosts: () => dispatch(GetAllPosts()),
  boundFilterPosts: (category) => dispatch(filterPosts(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

