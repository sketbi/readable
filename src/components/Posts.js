import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Grid, Item, Segment, Menu, Button,Dropdown,Divider } from 'semantic-ui-react';
import { votePost, deleteExistingPost, getCommentForPost } from '../actions';
import sortBy from 'sort-by';
import { Loading } from './Loader'
import Moment from 'react-moment';



 



class Posts extends Component {

  state = {
    activeCategory: 'All',
    order: 'newest'
  }

  sortyByOptions =  [
    { key: 1, text: 'Newest', value: 'newest' },
    { key: 2, text: 'Oldest', value: 'oldest' },
    { key: 3, text: 'Popular', value: 'popular' }
  ]


  handleChange = (e, { value }) => {
    this.setState({ 
      order : value
     });
  }

  selectCategory = (event, activeCategory) => {
    this.setState({ activeCategory });
  }

  voteUpPost = (e, post) => {
    e.preventDefault();
    this.props.boundVotePost(post,"upVote");
  }

  voteDownPost = (e, post) => {
    e.preventDefault();
    this.props.boundVotePost(post,"downVote");
  }


  deletePost = (e, post) => {
    e.preventDefault();
    this.props.boundDeletePost(post);
  }

  routePostDetails = (e,post) => {
    if(post.commentCount > 0){
      this.props.changePageTo("/posts/"+post.id);
    }else{
      this.props.changePageTo("/posts/"+post.id);
    }
  }

  orderPost = (posts, order) => {
    switch (order) {
      case 'newest':
       return posts.sort(function(a,b){
        var c = new Date(a.timestamp);
        var d = new Date(b.timestamp);
        return d-c;
        });
      case 'oldest':
      return posts.sort(function(a,b){
        var c = new Date(a.timestamp);
        var d = new Date(b.timestamp);
        return c-d;
        });
      case 'popular':
      return posts.sort(sortBy('-voteScore', 'title'));
      default:
        return posts;
    }
  }


  displayAllCategories = () => this.setState({ activeCategory: 'All' });


  render() {

    if (this.props.hasErrored) {
      this.props.changePageTo("/error");
    }

    if (this.props.isLoading) {
      return <Loading></Loading>;
    }


    const { category, post } = this.props;
    const { order, activeCategory } = this.state

    let displayPosts = this.orderPost(post, order);

    if (activeCategory !== 'All') { displayPosts = displayPosts.filter(x => x.category === activeCategory); }


    var divStyle = {
      color: "#eee",
      background: "#eee",
      padding: "20px",
      margin: "20px"
    };


    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3} style={divStyle}>
              <Menu compact secondary vertical >
                <Menu.Item name='All' active={this.state.activeCategory === 'All'}
                  onClick={(event) => this.displayAllCategories()}
                />
                {category.map((myCategory, index) =>
                  <Menu.Item key={index} name={myCategory.name} active={this.state.activeCategory === myCategory.name}
                    onClick={(event) => this.selectCategory(event, myCategory.name)} />)}
                />)}
              </Menu>
            </Grid.Column>
            <Grid.Column width={9}>
              <Segment clearing basic floated='right'>
                  <Dropdown item simple text='Sort By'closeOnChange direction='right' options={this.sortyByOptions}
                     onChange={this.handleChange}
                  />
              </Segment>
           
              <Item.Group relaxed>
                {displayPosts.map((myPost, i) =>
                  <Item key={i}>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='h2'><a onClick={(event) => this.routePostDetails(event, myPost)}>{myPost.title}</a></Item.Header>
                    <Item.Meta>{myPost.author}</Item.Meta>
                    <Item.Meta>
                      <Moment parse="YYYY-MM-DD HH:mm" format="YYYY/MM/DD" >
                       {new Date(myPost.timestamp)}
                      </Moment>
                    </Item.Meta>
                    <Item.Description>{myPost.body}</Item.Description>
                    <Item.Extra>
                    <b>{myPost.commentCount}</b> Comments <br/>
                      <b>{myPost.voteScore}</b> Votes <br/>
                      <Button icon='thumbs up' onClick={(event) => this.voteUpPost(event, myPost)}/>
                      <Button icon='thumbs down' onClick={(event) => this.voteDownPost(event, myPost)}/>
                    </Item.Extra>
                    <Divider />
                  </Item.Content>
                </Item> 
             )}
            
               </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>





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
  boundDeletePost: (post) => deleteExistingPost(post),
  boundLoadComment : (post) => getCommentForPost(post),
  boundVotePost : (post,option) => votePost(post,option)

}, dispatch)



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

