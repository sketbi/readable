import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Grid, Header,Dropdown, Container} from 'semantic-ui-react';
import Moment from 'react-moment';


import {getCommentForPost} from '../middleware/comments'
import { updatePost,deleteExistingPost} from '../middleware/posts';

import {  ErrorMessage, DeleteConfirmationModal } from './Loader'
import PostComments from './PostComments';

class PostDetails extends Component {

   state = {
    deleteDialog : false
   }

  getPostFromState = () => {
    const postIdFromRoute = this.props.match.params.id;
    return this.props.post.find(x => x.id === postIdFromRoute)
  }

  routeToEditPost = () => {
    const post = this.getPostFromState();
    this.props.changePageTo("/"+post.category+"/"+post.id+"/edit");
  }
  componentWillMount = () =>{
    const myPost = this.getPostFromState();
    if(myPost){
        if(myPost.commentCount !== myPost.comments.length){
            console.log("loading comments");
            this.props.boundGetCommentForPost(myPost);
        }
    }
  }
  showDeleteDialog = () => {
    this.setState({
      deleteDialog : true
    })
  }
  
  closeDeleteDialog = () => {
      this.setState({
        deleteDialog : false
      })
  }
 
  deletePost = () => {
    this.props.boundDeletePost(this.getPostFromState());
    this.closeDeleteDialog();
    this.props.changePageTo("/");
  }




  render() {

    const myPost = this.getPostFromState();
   if(this.props.hasErrored){
       return <ErrorMessage message='Error in post id'/>
   }

    if(!myPost){
        return <ErrorMessage message='Invalid post'/>

    }
    return (
       <div>
       <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
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
                  <PostComments/>
              </Container>
          </Grid.Column>
          <Grid.Column width={2}>
            <Dropdown text='Actions' icon='edit' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.routeToEditPost()}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => this.showDeleteDialog()}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {  (this.state.deleteDialog) &&      
               <DeleteConfirmationModal 
                openDialog={this.state.deleteDialog}
                record={myPost}
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
    category,
    post,
    hasErrored,
    isLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePageTo: (page) => push(page),
  boundUpdatePost :(post) => updatePost(post),
  boundDeletePost : (post) => deleteExistingPost(post),
  boundGetCommentForPost : (post) => getCommentForPost(post),
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));

