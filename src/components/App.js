import React, { Component } from 'react';
import axios from 'axios';
import Post from './../components/Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPost = this.filterPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( (response) => {
      this.setState({posts: response.data});
      console.log(response.data)
    });
  }

  filterPost(text) {
    console.log('filtered')
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`).then( (response) => {
      this.setState({posts: response.data});
    });
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( (response) => {
      this.setState({posts: response.data})
    })  
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( (response) => {
      this.setState({posts: response.data})
    })  
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( (response) => {
      this.setState({posts: response.data})
    })  
  }

  render() {
    const { posts } = this.state; // deconstructored post from this.state so can reference just posts in code below
    
    return (
      <div className="App__parent">
        <Header 
          filterPostFn = {this.filterPost}
        />

        <section className="App__content">

          <Compose 
            createPostFn = {this.createPost}
          />

          { 
            posts.map( post => (                //map through posts array from state passing in each element and rendering component for each
              <Post 
                key={post.id} 
                text={post.text} 
                date={post.date}
                updatePostFn={this.updatePost}
                id={post.id}
                deletePostFn = {this.deletePost} />          //Render Post component with key = post.id
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
