import React, { Component } from 'react';
import { default as UUID } from "node-uuid";
import  { Select,Button, Form, Input, TextArea,Segment,Header,Message,Container } from 'semantic-ui-react'
import { getCategoriesOptions } from '../utils/helper';



class PostForm extends Component {

  constructor(props) {
    super(props);
    if(props.myPost){
      this.state = {
        title: props.myPost.title, 
        author: props.myPost.author, 
        body: props.myPost.body, 
        postCategory: props.myPost.category,
        errors : []
       };
    }else{
      this.state = { 
        title: '', 
        author: '', 
        body: '', 
        postCategory: '' ,
        errors : []
       }
    }

  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  handleSubmit = () => {
      const { title, author, body, postCategory } = this.state
      const postID = this.props.myPost ? this.props.myPost.id : UUID.v4();
      
      let errors = [];
      
      if(title === ''){
        errors.push('Title is Mandatory');
      }
      if(author === ''){
        errors.push('Author is Mandatory');
      }
      if(body === ''){
        errors.push('Body is Mandatory');
      }
      if(postCategory === ''){
        errors.push('Category is Mandatory');
      }
      if(errors.length > 0){
         this.setState({errors
         });
      }else{
        let myPost =  this.props.myPost ?  this.props.myPost : {};
        myPost.id = postID;
        myPost.title = title;
        myPost.author = author;
        myPost.body = body;
        myPost.category = postCategory;
        myPost.timestamp = new Date();
        this.props.saveChanges(myPost);
        this.setState({
          errors : []
        });
        this.props.closeForm();
        
      }


  }

  render() {
    let categoryOptions = getCategoriesOptions(this.props.categories);
    const { title, author, body, postCategory,errors } = this.state
    const editMode = (this.props.myPost) ? true : false;    
    return (
      <div>
              

          <Segment clearing basic>
            <Container>
            {
              (editMode) ? (
                <Header as='h1' floated='left'>Edit Post</Header>
              ) : (
                <Header as='h1' floated='left'>New Post</Header>
              )
            }
            </Container>
            {
              (errors.length > 0) &&
                  <Container>
                    <Message negative>
                    <Message.Header>Missing Information</Message.Header>
                      <ul>
                        {
                          errors.map(function(item, i){
                            return <li key={i}>{item}</li>
                          })
                        }
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
                <Button onClick={this.props.closeForm} >Cancel</Button>
            </Form>
          </Segment>

       </div>
    );
}

}

export default PostForm;
