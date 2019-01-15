import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor(props){
    super(props);

    this.filterPost = this.filterPost.bind(this);

  }

  filterPost(val){
    const {filterPostFn} = this.props;
    filterPostFn(val)
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
            placeholder="Search Your Feed" 
            onChange={(e) => this.filterPost(e.target.value)} />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}