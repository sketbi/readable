import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Grid, Header, Modal,Dropdown, Container, Comment, Form, Button, Input,Divider} from 'semantic-ui-react';
import Moment from 'react-moment';
import { default as UUID } from "node-uuid";

import { 
  addNewComment, 
  voteComment, 
  deleteComment,
  updatePost,
  deleteExistingPost, 
  getCommentForPost,
  updateComment } from '../actions';

import { Loading } from './Loader'
import PostForm from './PostForm';
import PostComment from './PostComment';

class PostDetails extends Component {

  state = {
    post: {},
    author : '',
    body :'',
    readMode : true,
    editMode : false,
    deleteConfirmation : false
  };



  componentWillMount() {
     const post = this.getPostFromState();
     if(post){
       if(post.commentCount > 0){
          this.props.boundGetCommentForPost(post);
          this.refreshPost();
       }else{
        this.setState({post});
       }
     }
  }

  modifyEditMode = (flag) => {
    this.setState({
      editMode : flag
    })
  }

  modifyDeleteMode = (flag) => {
    this.setState({
      deleteConfirmation : flag
    })
  }

  openEditMode = () =>{
    this.modifyEditMode(true);
  }

  closeEditMode = () =>{
    this.modifyEditMode(false);
  }

  openDeleteMode = () =>{
    this.modifyDeleteMode(true);
  }

  closeDeleteMode = () =>{
    this.modifyDeleteMode(false);
  }


  getPostIndexInState = () => {
    const postIdFromRoute = this.props.match.params.id;
    return this.props.post.findIndex(x => x.id === postIdFromRoute)
  }

  getPostFromState = () => {
    return this.props.post[this.getPostIndexInState()];
  }

  savePost = (post) =>{
    this.props.boundUpdatePost(post);
    this.setState({
      post
    })
  }

  deletePost  = () => {
     this.props.boundDeletePost(this.state.post);
     this.props.changePageTo("/");
  }
 

  refreshPost =() =>{
    const myPost = this.getPostFromState();
    this.setState({
      post: myPost,
      author: '',
      body: '',
    });
  }

  addComment = (comment) => {
    this.props.boundAddComment(this.state.post, comment);
    this.refreshPost();
  }

  updateComment = (comment) => {
    this.props.boundAddComment(this.state.post, comment);
    this.refreshPost();
  }


  voteUpComment = (comment) => {
    this.props.boundVoteComment(this.state.post, comment, "upVote");
  }

  voteDownComment = (comment) => {
    this.props.boundVoteComment(this.state.post, comment, "downVote");
  }


  deleteComment = (comment) => {
    this.props.boundDeleteComment(this.state.post, comment);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () =>  {
    const { author, body,post } = this.state
    const uuid = UUID.v4();
    const comment = {
      id: uuid,
      parentId: post.id,
      author: author,
      body: body,
      timestamp: Date.now()
    }
    this.addComment(comment);
  }


  render() {

    const myPost = this.state.post;


    if (this.props.hasErrored) {
      this.props.changePageTo("/error");
    }

    if (this.props.isLoading) {
      return <Loading></Loading>;
    }

    if (!this.props.post) {
      return <Loading />
    }

    if (!myPost) {
      return <Loading />
    }



    var modalCenter = {
      margin: "150px",
      marginTop : "300px",
    };

     const {author,body} = this.state
    return (

      <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
          {
              (this.state.editMode) ? (
                
                <PostForm
                myPost={myPost}
                categories={this.props.category}
                saveChanges={this.savePost}
                closeForm={this.closeEditMode}
              />
                  ) : (
                <Container>
                  <Header size='huge'>{myPost.title}</Header>
                  <ul>
                    <li><b>Author:</b> {myPost.author}</li>
                    <li><b>Category:</b> {myPost.category}</li>
                    <li><b>Publish Date:</b> <Moment parse="YYYY-MM-DD HH:mm" format="YYYY/MM/DD" >
                       {new Date(myPost.timestamp)}
                      </Moment></li>
                  </ul>
                  <p>{myPost.body}</p>
                         
                  <Comment.Group threaded>
                  <Header as='h3' dividing>Comments</Header>
                  {myPost.commentCount === 0 && <p>Be first one to commnet</p>}
                  {myPost.commentCount > 0 && myPost.comments.map((myComment, index) =>
                        <div key={index} style={{
                          padding: '2px',
                          margin:'10px'
                        }}>
                        <PostComment 
                          postComment={myComment}
                          voteUpComment={this.voteUpComment}
                          voteDownComment={this.voteDownComment}
                          deleteComment={this.deleteComment}
                          updateComment={this.updateComment}
                        />
                       </div>
  
                  )}
                <Form reply onSubmit={this.handleSubmit} >
                  <Form.Field id='form-input-control-author' control={Input} label='Name' placeholder='Name'
                    name='author' value={author} onChange={this.handleChange} />
                  <Form.TextArea name='body' label='Comment' placeholder='Type comment..' value={body} onChange={this.handleChange} />
                  <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
                </Comment.Group>
              </Container>
    
              )
            }
          </Grid.Column>
          <Grid.Column width={2}>
            <Dropdown text='Actions' icon='edit' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={ () => this.openEditMode()}>Edit</Dropdown.Item>
                <Dropdown.Item icon='danger' onClick={ () => this.openDeleteMode()} >Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {
        
        (this.state.deleteConfirmation) &&      
              <Modal open={this.state.deleteConfirmation} style={modalCenter}>
               <Header icon='delete' content='Delete Post' />
                <Modal.Content>
                   <p>Are you sure you want to delete post {myPost.title} ?</p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => this.deletePost()}>
                  Confirm Delete
                </Button>
                <Button  onClick={() => this.closeDeleteMode()}>
                  Cancel 
                </Button>
              </Modal.Actions>
              </Modal>

            } 
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
  boundVoteComment: (post, comment, option) => voteComment(post, comment, option),
  boundDeleteComment: (post, comment) => deleteComment(post, comment),
  boundUpdatePost :(post) => updatePost(post),
  boundDeletePost : (post) => deleteExistingPost(post),
  boundGetCommentForPost : (post) => getCommentForPost(post),
  boundUpdateComment : (post,comment) => updateComment(post,comment)
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));

