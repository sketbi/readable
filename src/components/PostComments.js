import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Header, Comment, Form, Button, Input} from 'semantic-ui-react';
import {addNewComment} from '../middleware/comments';


import { ErrorMessage } from './Loader'
import PostComment from './PostComment';
import { NewGuid } from '../utils/helper';

class PostComments extends Component {

   state = {
     author : '',
     body : ''
   }

  getPostFromState = () => {
    const postIdFromRoute = this.props.match.params.id;
    return this.props.post.find(x => x.id === postIdFromRoute)
  }


  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
  handleSubmit = () =>  {
    const { author, body } = this.state
    const uuid = NewGuid();
    const comment = {
      id: uuid,
      parentId: this.getPostFromState().id,
      author: author,
      body: body,
      timestamp: Date.now()
    }
    this.props.boundAddComment(this.getPostFromState(),comment);
    this.setState({
      author : '',
      body : ''
    });
  }
  
  render() {
    const myPost = this.getPostFromState();
    if(this.props.hasErrored){
       return <ErrorMessage message='Error in post comments'/>
    }
    const {author,body} = this.state;

    return (
       <div>
          <Comment.Group threaded>
            <Header as='h3' dividing>Comments {myPost.commentCount}</Header>
            {myPost.commentCount === 0 && <p>Be first one to commnet</p>}
            {myPost.commentCount > 0 && myPost.comments.map((myComment, index) =>
                <div key={index} style={{padding: '2px',margin:'10px'}}>
                  <PostComment postComment={myComment}/>
                </div>
            )}
          <Form reply onSubmit={this.handleSubmit} >
            <Form.Field id='form-input-control-author' control={Input} label='Name' placeholder='Name'
              name='author' value={author} onChange={this.handleChange} />
            <Form.TextArea name='body' label='Comment' placeholder='Type comment..' value={body} onChange={this.handleChange} />
            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
       </div>
    );
  }
}

function mapStateToProps({ post, category, hasErrored, isLoading }) {
  return {
    category,
    post,
    hasErrored,
    isLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePageTo: (page) => push(page),
  boundAddComment: (post, comment) => addNewComment(post, comment),
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostComments));

