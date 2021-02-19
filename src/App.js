import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Movie from './components/Movie';
import Payment from './components/Payment';
import CartImage from './images/cart-icon.png';

const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query=a'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=99f368f25199dd4b1f91ed36b077238d&query='

function CartModal({ cart, showCart, clearCart, handleClose, handleShowPayment }) {

  const sumTotalPrice = (cart) => {
    let sum = 0;
    cart.map(val => sum += +val.price)
    if (cart.length >= 3 && cart.length < 5) {
      window.localStorage.setItem("totalPrice", JSON.stringify(sum - (sum * 10 / 100)));
      return sum - (sum * 10 / 100);
    } else if (cart.length >= 5) {
      window.localStorage.setItem("totalPrice", JSON.stringify(sum - (sum * 20 / 100)));
      return sum - (sum * 20 / 100);
    }
    window.localStorage.setItem("totalPrice", JSON.stringify(sum));
    return sum;

  }

  const sumDiscount = (cart, discount) => {
    let sum = 0;
    cart.map(val => sum += +val.price)
    return sum * discount / 100
  }

  return (
    <Modal show={showCart} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>LIST IN CART</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.map((val, i) => (
          <div key={i} className="my-modal-content">
            <span className="modal-name">{i + 1}. {val.name}</span>
            <span className="modal-price">{val.price}</span>
          </div>
        ))}

        {cart.length >= 3 && cart.length < 5 && (
          <div className="my-modal-content">
            <div className="modal-name discount">Buy more than 3 pieces, get 10% discount.</div>
            <div className="modal-price discount">- {sumDiscount(cart, 10)}</div>
          </div>
        )}

        {cart.length >= 5 && (
          <div className="my-modal-content">
            <div className="modal-name discount">Buy more than 5 pieces, get 20% discount.</div>
            <div className="modal-price discount">- {sumDiscount(cart, 20)}</div>
          </div>
        )}

        <div className="sumTotalPrice">
          {sumTotalPrice(cart)}
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="success" onClick={handleShowPayment}>
          Pay
          </Button>
        <Button variant="danger" onClick={clearCart}>
          Clear
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

function PaymentModal({ showPayment, handleClosePayment }) {

  return (
    <Modal show={showPayment} onHide={handleClosePayment}>
      <Modal.Header closeButton>
        <Modal.Title>QR Promtpay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Payment />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClosePayment}>
          OK
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
          <CartModal cart={props.cart} showCart={props.showCart} clearCart={props.clearCart} handleClose={props.handleClose} handleShowPayment={props.handleShowPayment} />
        </div>
      )}

    </header>
  );
}

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, setPrice] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
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
      setDefaultPrice(data.results.length);
    });
  }

  const setDefaultPrice = (length) => {
    for (let i = 0; i < length; i++) {
      setPrice(old => [...old, Math.floor(Math.random() * (499 - 100 + 100))]);
    }
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

  const priceChangeHandler = (priceInput, index) => {
    const newPrice = [...price];
    newPrice[index] = +priceInput;
    console.log(newPrice[index])
    console.log(newPrice)
    setPrice(newPrice);
  }

  const addCartHandler = (movie, index) => {
    const newCart = [...cart];
    newCart.push({
      id: movie.id,
      name: movie.original_title,
      price: price[index]
    });
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  const openCartHandler = () => setShowCart(true);

  const handleClose = () => setShowCart(false);

  const clearCart = () => {
    window.localStorage.clear();
    setCart([]);
    setShowCart(false);
  }

  const handleShowPayment = () => {
    setShowCart(false)
    setShowPayment(true)
  };
  const handleClosePayment = () => setShowPayment(false);

  return (
    <>

      <PaymentModal showPayment={showPayment} handleClosePayment={handleClosePayment} />

      <Search
        searchTerm={searchTerm}
        showCart={showCart}
        cart={cart}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        openCart={openCartHandler}
        clearCart={clearCart}
        handleClose={handleClose}
        handleShowPayment={handleShowPayment}
      />

      <div className="movie-container">
        {movies.length > 0 && movies.map((movie, index) =>
          <Movie
            key={movie.id}
            index={index}
            movie={movie}
            price={price[index]}
            cart={cart[index]}
            change={priceChangeHandler}
            addCart={addCartHandler}
          />
        )}
      </div>
    </>
  );
}

export default App;
