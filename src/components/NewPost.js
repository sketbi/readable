import React, { Component } from 'react';
import {default as UUID} from "node-uuid";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import { addNewPost } from '../actions';


import PostForm from './PostForm';

class NewPost extends Component {
    
    savePost = (post) => {
        this.props.boundAddNewPost(post);
        this.props.changePage("/");
    }
    
    cancelAdd = () => {
        this.props.changePage("/");  
    }
    
    render() {
        return (
          <div>
                <PostForm 
                categories={this.props.category}
                saveChanges={this.savePost}
                closeForm={this.cancelAdd}

                />
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

