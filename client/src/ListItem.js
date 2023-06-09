import { useContext, useState, useEffect } from 'react';
import { WatchedContext } from './App'

const ListItem = ({ newItem }) => {

  const [item, setItem] = useState({});
  const { watched, setWatched } = useContext(WatchedContext);

  useEffect(() => {
    let beenWatched = false;
    for (let movie in watched) {
      if (movie.title === newItem.title) {
        beenWatched = true;
      }
    }

    let newMovie = {
      title: newItem.title,
      watched: beenWatched
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
    setItem(newMovie)
    if (newMovie.watched) {
      let newWatched = watched;
      newWatched.push(item);
      setWatched(newWatched);
      console.log(watched)
    } else {
      let newWatched = watched.filter(movie => movie.title !== newMovie.title);
      setWatched(newWatched);
    }
  }

  return (
    <>
      <p>{item.title}</p>
      <button onClick={toggleWatched}>{item.watched ? `Unwatch` : `Watched`}</button>
    </>
  )
}

export default ListItem;