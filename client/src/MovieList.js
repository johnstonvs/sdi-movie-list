import { useEffect, useState, useContext } from 'react';
import { WatchedContext } from './App';
import ListItem from './ListItem';

const MovieList = ({ word }) => {

  const [movies, setMovies] = useState([]);
  const [showWatched, SetShowWatched] = useState(false);
  const { watched } = useContext(WatchedContext)

  useEffect(() => {
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
    let newValue = !showWatched;
    SetShowWatched(newValue);
  }

  return (
    <>
      <div className="MovieList">
        {showWatched ? watched.map((movie) => <p>{movie.title}</p>) : movies.map((movie, key) => {
          return (
            <ListItem key={key} newItem={movie}/>
          )
        })}
        <br/>
        <button onClick={toggleWatched}>Toggle</button>
      </div>
    </>
  );
}

export default MovieList;