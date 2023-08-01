import React from 'react';
import Card from './Card.tsx';
import './Movies.scss'

import type {MoviesData, Movie} from './types/index.tsx';

export type MoviesProps = {
    searchTerm: string;
    searchType: string;
    moviesData: string | MoviesData;
}

export default function Movies({searchTerm, searchType, moviesData}: MoviesProps) {

    const getMovieCards = () => {

        if (!moviesData || typeof moviesData === "string" || !moviesData.Search) return null;

        const movies = moviesData.Search;

        return (
            <ul className='movies__list'> 
                {movies.map((movie: Movie) => <li className='movies__list-item' key={movie.imdbID}><Card movie={movie}/></li>)}
            </ul>
        );
    }

    const getMoviesHTML = () => {

        if (searchTerm === "") {
            return;
        }

        if (moviesData === "") {
            return;
        }

        if (typeof moviesData === "string") {
            return <h2>{moviesData}</h2>
        }

        if (moviesData.Response === "False") {

            if (moviesData.Error === "Incorrect IMDb ID.") {
                return;
            }

            return <h2>{moviesData.Error}</h2>;
        } 
        
        return getMovieCards();
    }

    return (
        <div className="movies">
            {getMoviesHTML()}
        </div>
    );
}

