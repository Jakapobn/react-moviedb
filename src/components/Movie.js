import React from 'react'
import Img from '../images/movie_icon.png';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

function Movie(props) {
    return (
        <div className="movie">
            <img src={props.movie.poster_path ? IMG_API + props.movie.poster_path : Img} alt={props.movie.title} />

            <div className="movie-price">
                {/* <h3>$1000</h3> */}
                <input
                    className="input-price"
                    type="text"
                    value={props.cart ? props.cart.price : 0}
                    onChange={e => props.change(e.target.value, props.index)} />
                <span className="price-tag" onClick={() => props.addCart(props.movie)}>Add Cart</span>
            </div>

            <div className="movie-info">
                <h3>{props.movie.title}</h3>
                <span className={`tag ${setVoteClass(props.movie.vote_average)}`}>{props.movie.vote_average}</span>
            </div>

            <div className="movie-overview">
                <h2>Overview:</h2>
                <p>{props.movie.overview}</p>
            </div>
        </div>
    )
}

export default Movie
