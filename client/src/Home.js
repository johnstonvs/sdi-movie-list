import { useEffect, useState, useContext } from 'react';
import { WatchedContext } from './App'
import MovieList from './MovieList';


function Home() {

  const [word, setWord] = useState('');
  let searchValue = '';
  let addValue = '';

  useEffect(() => {
  }, [word])

  const handleSearch = () => {
    setWord(searchValue)
    searchValue = '';
  }

  const handleAdd = () => {

    fetch('http://localhost:8080/movies', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: addValue
      })
    })
      .then(res => res.json())
      .then(data => console.log('added: \n', data))
  }

  return (
    <div className="App">
      <div className='SearchBar'>
        <input type='text' onInput={(e) => searchValue = e.target.value} placeholder='search for movie...'></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <MovieList word={word} />
      <div className='AddBar'>
        <input type='text' onInput={(e) => addValue = e.target.value} placeholder='add a movie...'></input>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default Home;