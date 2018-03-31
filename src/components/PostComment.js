import React, { Component } from 'react';
import GridColumn, { Header, Dropdown, Icon, Comment, Form, Button, Input } from 'semantic-ui-react';
import Moment from 'react-moment';
import avatar from '../images/avatar.jpg'


import * as ReadableAPIUtil from '../utils/api'



class PostComment extends Component {

  state = {
     editMode : false,
     body : this.props.postComment.body

  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


   setEditMode = () => {
    this.setState({
      editMode : true
    });
   }

   closeEditMode = () => {
    this.setState({
      editMode : false,
      body :''
    });
   }

   updateComment = (comment) => {
     comment.body = this.state.body;
     comment.timestamp =  new Date();
     this.props.updateComment(comment);
     this.closeEditMode();
   }



  render() {


    const comment = this.props.postComment;
    
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
         { this.state.editMode  && 
            <Form>
              <Form.TextArea name='body' label='body'  value={this.state.body} onChange={this.handleChange} />
              <Button content='Update'  icon='update' primary onClick={() => this.updateComment(comment)} />
              <Button content='Cancel'  icon='update' onClick={()=> this.closeEditMode()} />
            </Form>
          }
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action as='a'>{comment.voteScore}</Comment.Action>
          <Comment.Action icon='thumbs up' onClick={ () => this.props.voteUpComment(comment)} >Vote Up</Comment.Action>
          <Comment.Action icon='thumbs down' onClick={ () => this.props.voteDownComment(comment)} >Vote Down</Comment.Action>
          <Comment.Action icon='delete' onClick={(event) => this.setEditMode()} >Edit</Comment.Action>
          <Comment.Action icon='delete' onClick={() =>this.props.deleteComment(comment)} >Delete</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    );
  }
}

export default PostComment

