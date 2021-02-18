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

function Movie({ title, poster_path, overview, vote_average, price, change }) {
    return (
        <div className="movie">
            <img src={poster_path ? IMG_API + poster_path : Img} alt={title} />

            <div className="movie-price">
                {/* <h3>$1000</h3> */}
                <input
                    className="input-price"
                    type="text"
                    value={price}
                    onChange={change()} />
                <span className="price-tag">Add Cart</span>
            </div>

            <div className="movie-info">
                <h3>{title}</h3>
                <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
            </div>

            <div className="movie-overview">
                <h2>Overview:</h2>
                <p>{overview}</p>
            </div>
        </div>
    )
}

export default Movie
