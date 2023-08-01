import { Link } from "react-router-dom";
import "./Card.scss";

import type {Movie} from './types/index.tsx';

type CardProps = {
    movie: Movie;
}

function Card({movie}: CardProps) {

    const getAltTag = () => {
        return movie["Title"] + " Poster";
    }

    return (
        <Link className="card" to={`/description/?imdbID=${movie["imdbID"]}`}>
            {movie["Poster"] !== "N/A" ? <img className="card__poster" src={movie["Poster"]} alt={getAltTag()} loading="lazy" height="400" width="260"/> : <div className="card__placeholder-poster"></div>}
            <h2 className="card__title">{movie["Title"]} ({movie["Year"]})</h2>
            <p className="card__type">{movie["Type"]}</p>
            <p className="card__id"><span>IMDb ID:</span> {movie["imdbID"]}</p>
        </Link>
    );
}

export default Card;