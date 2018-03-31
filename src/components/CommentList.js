import React, { Component } from 'react';
import { default as UUID } from "node-uuid";
import GridColumn, { Header, Dropdown, Icon, Comment, Form, Button, Input } from 'semantic-ui-react';

import PostComment from './PostComment';
import PostComment from './PostComment';

class CommentList extends Component {

  state = {
    body: '',
    author: '',
  }

  componentDidMount() {

  }

  componentWillMount() { 
    console.log("commentListPost ==>"+JSON.stringify(this.props.commentListPost));

  }





  render() {
    const {author,body} = this.state
    
    return (
     <p>Testing</p>
    );
  }
}




export default CommentList;

