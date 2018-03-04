import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Header, Dropdown, Item, Icon, Container, Segment } from 'semantic-ui-react';
import { GetAllPosts, filterPosts } from '../actions';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom'
import Categories from './Categories'

import * as ReadableAPIUtil from '../utils/api'

import coverNotAvailable from '../images/media-paragraph.png';

const options = [
  { key: 1, text: 'Timestamp', value: 'timestamp' },
  { key: 2, text: 'Vote Score', value: 'voteScore' }
]



class Posts extends Component {

  state = {}

  componentDidMount() {
    this.props.boundGetAllPosts();
  }

  handleChange = (e, { value }) => this.setState({ value })



  render() {
    const { category, post } = this.props;
    const { value } = this.state
    let displayPosts = post.slice();
    if (category.name !== 'All') { displayPosts = displayPosts.filter(x => x.category === category.name); }
    if (value !== undefined && value !== '') { displayPosts.sort(sortBy(value)) }

    return (
      <div>
            <Container>

                  <Container  style={{  margin:'5px',padding: '10px' }}>
                  <Segment clearing basic>
          <Header as='h1' floated='left'>Readable By Udacity</Header>
          <Header floated='right'>
            <Dropdown
              onChange={this.handleChange}
              options={options}
              placeholder='Sort By'
              selection
              value={value}
            />

      
          </Header>
          <Categories />
        </Segment>


        <Item.Group>
          {displayPosts.map((myPost, i) =>
            <Item key={i}>
              <Item.Content>
                <Item.Header as='a' >{myPost.title}</Item.Header>
                <Item.Meta>
                  <span>Author: {myPost.author}</span>
                </Item.Meta>
                <Item.Description>
                  <p>{myPost.body}</p>
                </Item.Description>
                <Item.Extra>
                  <Segment clearing basic floated='left'>
                    <Segment ><Icon as='i' size='large' disabled name='like outline' />{myPost.voteScore}</Segment>
                    <Segment > <Icon as='i' disabled name='commenting outline' size='large' />{myPost.commentCount}</Segment>
                  </Segment>
                </Item.Extra>

              </Item.Content>
            </Item>
          )}
        </Item.Group>
                  </Container>
                </Container>





      </div>
    );
  }
}


function mapStateToProps({ post, comment, category }) {
  return {
    category,
    post
  }
}

const mapDispatchToProps = dispatch => ({
  boundGetAllPosts: () => dispatch(GetAllPosts()),
  boundFilterPosts: (category) => dispatch(filterPosts(category))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

