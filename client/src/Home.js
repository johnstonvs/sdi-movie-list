import { useEffect, useState, createContext } from 'react';
// import MovieList from './MovieList';
// import SearchBar from './SearchBar';

const ListItem = ({ newItem }) => {

  const [item, setItem] = useState({});

  useEffect(() => {
    let newMovie = {
      title: newItem.title,
      watched: false
    }
    setItem(newMovie);
  }, [])

  useEffect(() => {
  }, [item])

  const toggleWatched = () => {
    let newMovie = {
      title: newItem.title,
      watched: !item.watched
    }
    setItem(newMovie);
  }

  return (
    <>
      <p>{item.title}</p>
      <button onClick={toggleWatched}>{item.watched ? `Unwatch` : `Watched`}</button>
    </>
  )
}

const MovieList = ({ word }) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(word, 'LSIT')
    if (word) {
      fetch(`http://localhost:8080/movies?title=${word}`)
        .then(res => res.json())
        .then(data => {
          setMovies(data);
        })
    } else {
      fetch('http://localhost:8080/movies')
        .then(res => res.json())
        .then(data => {
          const newMovies = [];
          for (let movie of data) {
            newMovies.push({
              title: movie.title,
              watched: false
            })
          }
          setMovies(newMovies)
        })
    }
  }, [word])

  const toggleWatched = () => {
    let newMovies = movies.map(movie => {

    });
  }

  return (
    <>
      <div className="MovieList">
        {movies.map((movie, key) => {
          return (
            <ListItem newItem={movie}/>
          )
        })}
      </div>
    </>
  );
}

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