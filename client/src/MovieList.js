import { useEffect, useState, useContext } from 'react';

const MovieList = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      })
  }, [])

  return (
    <div className="MovieList">
      {movies.map((movie, key) => {
        return <p key={key}>{movie.title}</p>
      })}
    </div>
  );
}

export default MovieList;