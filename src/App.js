import React, { useState, useEffect } from 'react';
import './App.css';

import Movie from './components/Movie';
import CartImage from './images/cart-icon.png';

const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query=a'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query='

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(async () => {
    getMovies(MOVIE_API)
  }, []);

  const getMovies = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && searchTerm !== ' ') {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const NewPrice = (e) => {
    setPrice(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>

        <div className="cart">
          <img className="cart-icon" src={CartImage} />
          <span class='badge badge-warning' id='lblCartCount'> 5 </span>
        </div>

      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) =>
          <Movie
            key={movie.id}
            {...movie}
            price={price}
            change={() => NewPrice}
          />
        )}
      </div>
    </>
  );
}

export default App;
