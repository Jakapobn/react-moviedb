import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Movie from './components/Movie';
import CartImage from './images/cart-icon.png';

const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query=a'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query='

function MyModal({ cart, showCart, clearCart, handleClose }) {
  return (
    <Modal show={showCart} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>LIST IN CART</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.map((val, i) => (
          <div key={i} className="my-modal-content">
            <span className="modal-name">{i + 1}. {val.name}</span>
            <span className="modal-price">100</span>
          </div>

        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="success" onClick={handleClose}>
          Pay
          </Button>
        <Button variant="danger" onClick={clearCart}>
          Clear
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Search(props) {
  return (
    <header>
      <form onSubmit={props.handleOnSubmit}>
        <input
          className="search"
          type="search"
          placeholder="Search..."
          value={props.searchTerm}
          onChange={e => props.handleOnChange(e.target.value)}
        />
      </form>

      <div className="cart" onClick={props.openCart}>
        <img className="cart-icon" src={CartImage} />
        {props.cart && props.cart.length > 0 && (
          <span className='badge badge-warning' id='lblCartCount'>{props.cart.length}</span>
        )}
      </div>
      {props.cart.length > 0 && (
        <div>
          <MyModal cart={props.cart} showCart={props.showCart} clearCart={props.clearCart} handleClose={props.handleClose} />
        </div>
      )}

    </header>
  );
}

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([
    {
      id: 529203,
      name: 'The Croods: A New Age',
      price: '500',
    }
  ]);
  const [showCart, setShowCart] = useState(false);
  const local = JSON.parse(localStorage.getItem("cart"));

  useEffect(async () => {
    getMovies(MOVIE_API);
    console.log('local => ', local)
    if (local && local.length > 0) {
      setCart(local);
    }
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

  const handleOnChange = (value) => {
    setSearchTerm(value);
  }

  const priceChangeHandler = (price, index) => {
    const newCart = [...cart];
    newCart[index].price = price;
    setPrice(newCart);
  }

  const addCartHandler = (movie) => {
    console.log('movie => ', movie);
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

  const openCartHandler = () => setShowCart(true);

  const handleClose = () => setShowCart(false);

  const clearCart = () => {
    console.log('clearCart');
    window.localStorage.clear();
    setCart([]);
    setShowCart(false);
  }


  return (
    <>
      <Search
        searchTerm={searchTerm}
        showCart={showCart}
        cart={cart}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        openCart={openCartHandler}
        clearCart={clearCart}
        handleClose={handleClose}
      />

      <div className="movie-container">
        {movies.length > 0 && movies.map((movie, index) =>
          <Movie
            key={movie.id}
            index={index}
            movie={movie}
            change={priceChangeHandler}
            addCart={addCartHandler}
          />
        )}
      </div>
    </>
  );
}

export default App;
