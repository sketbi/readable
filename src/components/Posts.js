import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Item, Dropdown, Button, Divider, Segment } from 'semantic-ui-react';
import sortBy from 'sort-by';

import Moment from 'react-moment';
import { votePost, deleteExistingPost } from '../middleware/posts';


import { DeleteConfirmationModal } from './Loader'



class Posts extends Component {

  state = {
    order: 'newest',
    deleteDialog : false,
    deletePost : {}
  }

  sortyByOptions = [
    { key: 1, text: 'Newest', value: 'newest' },
    { key: 2, text: 'Oldest', value: 'oldest' },
    { key: 3, text: 'Popular', value: 'popular' }
  ]

  handleChange = (e, { value }) => {
    this.setState({
      order: value
    });
  }
  voteUpPost = (e, post) => {
    e.preventDefault();
    this.props.boundVotePost(post, "upVote");
  }

  voteDownPost = (e, post) => {
    e.preventDefault();
    this.props.boundVotePost(post, "downVote");
  }

  showDeleteDialog = (post) => {
    this.setState({
      deleteDialog : true,
      deletePost : post
    })
  }
  
  closeDeleteDialog = () => {
      this.setState({
        deleteDialog : false,
        deletePost : {}
      })
  }

 
  deletePost = () => {
    this.props.boundDeletePost(this.state.deletePost);
    this.closeDeleteDialog();
    this.props.changePageTo("/");
  }

  routeEditPost = (e, post) => {
    this.props.changePageTo("/" + post.category + "/" + post.id + "/edit");

  }

  routePostDetails = (e, post) => {
    this.props.changePageTo("/" + post.category + "/" + post.id);
  }



  orderPost = (posts, order) => {
    switch (order) {
      case 'newest':
        return posts.sort(function (a, b) {
          var c = new Date(a.timestamp);
          var d = new Date(b.timestamp);
          return d - c;
        });
      case 'oldest':
        return posts.sort(function (a, b) {
          var c = new Date(a.timestamp);
          var d = new Date(b.timestamp);
          return c - d;
        });
      case 'popular':
        return posts.sort(sortBy('-voteScore', 'title'));
      default:
        return posts;
    }
  }


  render() {
    const routeCategory = this.props.match.params.category;
    let matchPosts = (routeCategory) && routeCategory !== '' ? this.props.post.filter(x => x.category === routeCategory) : this.props.post;
    matchPosts = this.orderPost(matchPosts, this.state.order);
    const matchPostsLength = matchPosts.length;
    return (
      <div>
         {matchPostsLength > 0 ? (<div><Segment clearing basic floated='right'>
          <Dropdown item simple text='Sort By' closeOnChange direction='right' options={this.sortyByOptions}
            onChange={this.handleChange}
          />
        </Segment>
        <Item.Group relaxed>
          {matchPosts.map((myPost, i) =>
            <Item key={i}>
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h2'><a onClick={(event) => this.routePostDetails(event, myPost)}>{myPost.title}</a></Item.Header>
                <Item.Meta>{myPost.author}</Item.Meta>
                <Item.Meta>
                  <Moment parse="YYYY-MM-DD HH:mm" format="YYYY/MM/DD" >
                    {new Date(myPost.timestamp)}
                  </Moment>
                </Item.Meta>
                <Item.Description>{myPost.body}</Item.Description>
                <Item.Extra>
                  <b>{myPost.commentCount}</b> Comments <br />
                  <b>{myPost.voteScore}</b> Votes <br />
                  <Button icon='thumbs up' onClick={(event) => this.voteUpPost(event, myPost)} />
                  <Button icon='thumbs down' onClick={(event) => this.voteDownPost(event, myPost)} />
                  <Button icon='edit' onClick={(event) => this.routeEditPost(event, myPost)} />
                  <Button icon='delete' onClick={(event) => this.showDeleteDialog(myPost)} />
                </Item.Extra>
                <Divider />
              </Item.Content>
            </Item>
          )}
        </Item.Group></div>) : (<p>No posts found</p>)}
        
         {  (this.state.deleteDialog) &&      
               <DeleteConfirmationModal 
                openDialog={this.state.deleteDialog}
                record={this.state.deletePost}
                deletePost={this.deletePost}
                closeDelete={this.closeDeleteDialog}
               />
          }
      </div>

    );
  }
}

function mapStateToProps({ post, category, hasErrored, isLoading }) {
  return {
    post
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePageTo: (page) => push(page),
  boundDeletePost: (post) => deleteExistingPost(post),
  boundVotePost: (post, option) => votePost(post, option)
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

