import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import MenuItem, { Header, Dropdown, Item, Icon, Container, Segment, Menu } from 'semantic-ui-react';
import { GetAllPosts,GetAllGategories } from '../actions';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom'


import * as ReadableAPIUtil from '../utils/api'

import coverNotAvailable from '../images/media-paragraph.png';

const options = [
  { key: 1, text: 'Timestamp', value: 'timestamp' },
  { key: 2, text: 'Vote Score', value: 'voteScore' }
]



class Posts extends Component {

  state = {
    activeCategory: 'All',
    sortBy : ''
  }

  componentDidMount() {
  }

  handleChange = (e, { sortBy }) => this.setState({ sortBy })

  updateSelectedCategory = (activeCategory) => this.setState({activeCategory})
  resetDefaulState = () => this.setState({activeCategory: 'All'})


  render() {
    const { category, post } = this.props;
    const { sortBy,activeCategory } = this.state
    let displayPosts = post.slice();
    if (activeCategory !== 'All') { displayPosts = displayPosts.filter(x => x.category === activeCategory); }
    if (sortBy !== undefined && sortBy !== '') { displayPosts.sort(sortBy(sortBy)) }
 
    return (
      <div>
        <Container>
        <Menu inverted>
           <Menu.Item name='All' onClick={(event) => this.resetDefaulState()}/>
          {category.map((myCategory, index) =>
            <Menu.Item key={index} name={myCategory.name} active={this.state.activeCategory.name === myCategory.name}
              onClick={(event) => this.updateSelectedCategory(myCategory.name)} />)}
        </Menu>
 
          <Container style={{ margin: '5px', padding: '10px' }}>
            <Segment clearing basic>
              <Header as='h1' floated='left'>Readable By Udacity</Header>
              <Header  size='small' floated='right'>
                 <Dropdown text='Sort By' pointing className='link item'
                  onChange={this.handleChange}
                  options={options}
                  placeholder='Sort By'
                  value={sortBy}
                  icon='sort'
                />
              </Header>
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


export default withRouter(connect(mapStateToProps, null)(Posts));

