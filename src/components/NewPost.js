import React, { Component } from 'react';
import {default as UUID} from "node-uuid";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import { addNewPost } from '../actions';

import  { Select,Button, Form, Input, TextArea,Segment,Header } from 'semantic-ui-react'


import * as ReadableAPIUtil from '../utils/api'



class NewPost extends Component {

    state = { 
        title: '', 
        author: '', 
        body: '', 
        postCategory: '' 
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })


    handleSubmit = () => {
        const { title, author, body, postCategory } = this.state
        
        const myPost = {
            id : UUID.v4(),
            title : this.state.title,
            author : this.state.author,
            body : this.state.body,
            category : this.state.postCategory,
            timestamp : Date.now()
        }
        this.props.boundAddNewPost(myPost);
      }


    render() {
        const { category } = this.props;
        let categoryOptions = [];
        category.forEach(function(item){
            categoryOptions.push({ key: item.path, text: item.name, value: item.path });
        });
        const { title, author, body, postCategory } = this.state
        
        return (
          <div>
              <Segment clearing basic>
                <Header as='h1' floated='left'>New Post</Header>
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
                    <Button type='submit'>Save</Button>
                </Form>
              </Segment>

           </div>
        );
    }
}


function mapStateToProps({ post, comment, category }) {
    return {
      category
    }
  }

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (page) => push(page),
    boundAddNewPost : (post) => addNewPost(post)
}, dispatch)


export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));

