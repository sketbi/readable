import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Comment, Form, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import avatar from '../images/avatar.jpg'

import {
  voteComment,
  deleteComment,
  updateComment
} from '../middleware/comments';


class PostComment extends Component {

  state = {
    editMode: false,
    body: ''

  }

  getPostFromState = () => {
    const postIdFromRoute = this.props.match.params.id;
    return this.props.post.find(x => x.id === postIdFromRoute)
  }

  getCommentFromProps = () => {
    return this.props.postComment;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  setEditMode = (comment) => {
    this.setState({
      editMode: true,
      body: comment.body
    });
  }
  closeEditMode = (comment) => {
    this.setState({
      editMode: false,
      body: ''
    });
  }


  updateComment = (comment) => {
    comment.body = this.state.body;
    comment.timestamp = new Date();

  }
  voteComment = (comment, option) => {
    this.props.boundVoteComment(this.getPostFromState(), comment, option);
  }

  deleteComment = (comment) => {
    this.props.boundDeleteComment(this.getPostFromState(), comment);
  }
  handleSubmit = () => {
    let updatedComment = this.getCommentFromProps();
    updatedComment.body = this.state.body
    updatedComment.timestamp = new Date();
    this.props.boundUpdateComment(this.getPostFromState(), updatedComment);
    this.closeEditMode();
  }

  render() {
    const comment = this.getPostFromState().comments.find(x => x.id === this.props.postComment.id);
    return (
      <Comment>
        <Comment.Avatar as='a' src={avatar} />
        <Comment.Content>
          <Comment.Author as='a'>{comment.author}</Comment.Author>
          <Comment.Metadata>
            <Moment parse="YYYY-MM-DD HH:mm" format="YY-MM-DD HH:mm" >{new Date(comment.timestamp)}</Moment>
          </Comment.Metadata>
          <Comment.Text>
            <p>{comment.body}</p>
            {this.state.editMode &&
              <Form onSubmit={this.handleSubmit}>
                <Form.TextArea name='body' value={this.state.body} onChange={this.handleChange} />
                <Button content='Update'  primary />
                <Button content='Cancel' compact onClick={() => this.closeEditMode()} />
              </Form>
            }
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action as='a'>{comment.voteScore}</Comment.Action>
            <Comment.Action icon='thumbs up' onClick={() => this.voteComment(comment, "upVote")} >Vote Up</Comment.Action>
            <Comment.Action icon='thumbs down' onClick={() => this.voteComment(comment, "downVote")} >Vote Down</Comment.Action>
            <Comment.Action icon='delete' onClick={(event) => this.setEditMode(comment)} >Edit</Comment.Action>
            <Comment.Action icon='delete' onClick={() => this.deleteComment(comment)} >Delete</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

    );
  }
}

function mapStateToProps({ post, category, hasErrored, isLoading }) {
  return {
    post,
    hasErrored,
    isLoading
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  changePageTo: (page) => push(page),
  boundVoteComment: (post, comment, option) => voteComment(post, comment, option),
  boundDeleteComment: (post, comment) => deleteComment(post, comment),
  boundUpdateComment: (post, comment) => updateComment(post, comment)
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostComment));


