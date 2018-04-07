import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

import { Select, Button, Form, Input, TextArea, Segment, Header, Message, Container } from 'semantic-ui-react'
import { getCategoriesOptions, NewGuid } from '../utils/helper';

import { updatePost, addNewPost } from '../middleware/posts';
import { ErrorMessage } from './Loader';


class PostForm extends Component {

  constructor(props) {
    super(props);
    const postID = this.props.match.params.id;
    if (postID) {
      const myPost = props.post.find(x => x.id === postID);
      this.state = {
        title: myPost.title,
        author: myPost.author,
        body: myPost.body,
        postCategory: myPost.category,
        errors: []
      };
    } else {
      this.state = {
        title: '',
        author: '',
        body: '',
        postCategory: '',
        errors: []
      }
    }


  }


  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  cancelForm = () => {
    this.props.changePage("/")
  }

  isPostIdPath = () => {
    return (this.props.match.params.id);
  }

  getPostIdFromPath = () => {
    return this.props.match.params.id
  }

  getPostFromState = () => {
    const postIdFromRoute = this.props.match.params.id;
    return this.props.post.find(x => x.id === postIdFromRoute)
  }

  handleSubmit = () => {
    const { title, author, body, postCategory } = this.state
    const postID = this.isPostIdPath() ? this.getPostIdFromPath() : NewGuid()

    let errors = [];

    if (title === '') {
      errors.push('Title is Mandatory');
    }
    if (author === '') {
      errors.push('Author is Mandatory');
    }
    if (body === '') {
      errors.push('Body is Mandatory');
    }
    if (postCategory === '') {
      errors.push('Category is Mandatory');
    }
    if (errors.length === 0) {
      let myPost =this.isPostIdPath() ? this.getPostFromState() : {};
      myPost.id = postID;
      myPost.title = title;
      myPost.author = author;
      myPost.body = body;
      myPost.category = postCategory;
      myPost.timestamp = new Date();
      if (this.isPostIdPath()) {
        this.props.boundUpdatePost(myPost);
        this.props.changePage("/" + myPost.category + "/" + myPost.id);
      } else {
        this.props.boundAddNewPost(myPost);
        this.props.changePage("/" + myPost.category + "/" + myPost.id);
      }
    } else {
      this.setState({ errors });
    }
  }


  render() {
    let categoryOptions = getCategoriesOptions(this.props.category);
    const { title, author, body, postCategory, errors } = this.state
    const editMode = this.isPostIdPath();
    
    if(editMode){
      if(!this.getPostFromState()){
        return <ErrorMessage message='Invalid Post'/>
      }
    }

    return (
      <div>
        <Segment clearing basic>
          <Container>
            {(editMode) ? (<Header as='h1' floated='left'>Edit Post</Header>) : (<Header as='h1' floated='left'>New Post</Header>)}
          </Container>
          {(errors.length > 0) &&
            <Container>
              <Message negative>
                <Message.Header>Missing Information</Message.Header>
                <ul>{errors.map(function (item, i) {
                  return <li key={i}>{item}</li>
                })}
                </ul>
              </Message>
            </Container>
            }
          <Form onSubmit={this.handleSubmit}>
            <Form.Field id='form-input-control-title' control={Input} label='Title' placeholder='Title'
              name='title' value={title} onChange={this.handleChange}
            />
            <Form.Field id='form-input-control-author' control={Input} label='Author' placeholder='Author'
              name='author' value={author} onChange={this.handleChange}
            />
            <Form.Field id='form-textarea-control-body' control={TextArea} label='Body' placeholder='Body'
              name='body' value={body} onChange={this.handleChange}
            />
            <Form.Field control={Select} label='Category' options={categoryOptions} placeholder='Category'
              name='postCategory' value={postCategory} onChange={this.handleChange}
            />
            <Button type='submit' primary>Save</Button>
            <Button onClick={() => this.cancelForm()} >Cancel</Button>
          </Form>
        </Segment>

      </div>
    );
  }
}


function mapStateToProps({ post, category }) {
  return {
    post,
    category
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (page) => push(page),
  boundAddNewPost: (post) => addNewPost(post),
  boundUpdatePost: (post) => updatePost(post),
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));

