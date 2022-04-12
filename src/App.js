import { useEffect, useState } from 'react';

//import components
import MovieCard from './MovieCard';

//import syles 
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=23894110';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('superman');
  }, [])

  return (
    <div className='app'>
      <h1>MoviesApp</h1>

      <div className="search">
        <input
          type="text"
          placeholder='Search for movies'
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <img src={SearchIcon} alt="search" onClick={() => {searchMovies(search)}} />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Movie not found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;