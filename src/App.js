import React, { useState, useEffect } from 'react';
import './App.css';

import Movie from './components/Movie';
import CartImage from './images/cart-icon.png';

const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query=a'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query='

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, setPrice] = useState([]);
  const [cart, setCart] = useState([]);

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

  const NewPriceHandler = (i, e) => {
    const newPrice = e.target.value
    console.log(newPrice);
    // setPrice((oldPrice, i) => {
    //   console.log(oldPrice);
    //   if (i === i) {
    //     console.log(newPrice);
    //     return newPrice;
    //   }
    // });
  }

  const addCartHandler = (movie) => {
    console.log(movie);
    setCart(oldArr => [...oldArr,
    {
      id: movie.id,
      name: movie.original_title,
      price: price,
    }
    ]);

    console.log('cart => ', cart);
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
          {cart.length > 0 && (
            <span className='badge badge-warning' id='lblCartCount'>{cart.length}</span>
          )}
        </div>

      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie, i) =>
          <Movie
            key={movie.id}
            movie={{ ...movie, price: price[i] }}
            change={(e) => NewPriceHandler(i, e)}
            addCart={() => addCartHandler(movie)}
          />
        )}
      </div>
    </>
  );
}

export default App;
