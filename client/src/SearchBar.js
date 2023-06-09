import { useEffect, useState, useContext } from 'react';

const SearchBar = () => {


  return (
    <div className='SearchBar'>
      <input type='text' placeholder='search for movie...'></input>
      <button>Search</button>
    </div>
  )
}

export default SearchBar;