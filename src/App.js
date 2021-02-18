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
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const local = JSON.parse(localStorage.getItem("cart"));



  useEffect(async () => {
    getMovies(MOVIE_API);
    console.log('local => ', local)
    setCart(local);
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

  const NewPriceHandler = (id, e) => {
    const newPrice = e.target.value
    setPrice(newPrice);

    // console.log(newPrice);
    // console.log('price => ', price);


    // if (price.length > 0) {

    //   let found = price.find(val => val.id === id);
    //   if (found) {
    //     console.log('found => ', found);
    //     // setPrice(item => item.find(val => val.id === found.id).map(item => found));
    //     setPrice()
    //   } else {
    //     setPrice(item => [...item, { id: id, price: newPrice }])
    //   }

    // } else {
    //   setPrice(item => [...item, { id: id, price: newPrice }])
    // }

    // price.map()

    // setPrice(item => {
    //   console.log('item.id => ', item);
    //   console.log('id => ', id)

    //   if (item.length > 0) {
    //     return item.map(val => {
    //       if (val.id === id) {
    //         val.price = newPrice
    //         return val;
    //       } else {
    //         return { ...item, id: id, price: newPrice }
    //       }
    //     })
    //   } else {
    //     return [...item, { id: id, price: newPrice }]
    //   }
    // });


    // setPrice((oldPrice, i) => {
    //   console.log(oldPrice);
    //   if (i === i) {
    //     console.log(newPrice);
    //     return newPrice;
    //   }
    // });
  }

  const addCartHandler = (movie) => {
    setCart(oldArr => {
      const newItem = [...oldArr, {
        id: movie.id,
        name: movie.original_title,
        price: price,
      }];

      window.localStorage.setItem("cart", JSON.stringify(newItem));
      return newItem;
    });
  }

  const onShowCart = () => {
    setShowCart(!showCart)
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
            <span className='badge badge-warning' id='lblCartCount' onClick={onShowCart}>{cart.length}</span>
          )}
        </div>

        {/* {showCart == true && (
          <div className="cart-detail">
            {
              cart.map((val) => {
                <div>123123</div>
              })
            }
          </div>
        )} */}

      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie, i) =>
          <Movie
            key={movie.id}
            movie={{ ...movie, price: price[i] }}
            change={(e) => NewPriceHandler(movie.id, e)}
            addCart={() => addCartHandler(movie)}
          />
        )}
      </div>
    </>
  );
}

export default App;
