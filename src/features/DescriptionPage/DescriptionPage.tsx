import React, { useState } from "react";
import "./DescriptionPage.scss";

import { useSearchParams } from 'react-router-dom';
import ImageModal from "../../shared/components/ImageModal";
import NowPlaying from "../../shared/components/NowPlaying";
import Header from "../../shared/components/Header";

const API_KEY = "c92d6020"; // Fix
const descriptionKeys = [
    "Type",
    "Rated",
    "Released",
    "Runtime",
    "Genre",
    "Director",
    "Writer",
    "Actors",
    "Language",
    "Country",
    "Awards",
    "Metascore",
    "imdbRating",
    "imdbVotes",
    "imdbID"
];

type MovieData = {
    [key: string]: string;
}

function DescriptionPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [movieData, setMovieData] = useState<MovieData | string | null>();
    const [modalExpanded, setModalExpanded] = useState<boolean>(false);

    const getimdbID = () => {

        const defaultValue = searchParams.get("imdbID");

        if (defaultValue) {
            return defaultValue;
        }

        return "";
    }

    const getDescriptionList = () => {

        if (!movieData || typeof movieData === "string") {
            return;
        }

        const listItems = descriptionKeys.map((key) => {
            return <li className="description-page__list-item"><span>{key}: </span> {movieData[key]}</li>
        })

        return (
            <ul className="description-page__list">
                {listItems}
            </ul>
        );
    }

    const getAltTag = () => {

        if (!movieData || typeof movieData === "string") {
            return;
        }

        return movieData.Title + " Poster";
    }

    const imdbID = getimdbID();

    React.useEffect(() => {

        const getMovieData = async () => {
            try {
                setMovieData("Loading...");

                const response = await fetch(`https://www.omdbapi.com/?plot=full&i=${imdbID}&apikey=${API_KEY}`);
                const movieJson = await response.json();

                setMovieData(movieJson);
            } catch (error) {
                console.log("Error");
                setMovieData("Error");
            }
        }

        getMovieData();
    }, []);

    return (<>
        <Header />
        <div className="description-page">

            {
                (movieData && typeof movieData == "object") ? <>
                    <h1 className="description-page__title">{movieData?.Title} ({movieData?.Year})</h1>
                    <div className="description-page__poster-container">
                        <button className="description-page__poster-wrapper" onClick={() => { setModalExpanded(true) }}>
                            <img className="description-page__poster" src={movieData?.Poster} height="400px" onError={(event) => (event.target as HTMLElement).style.display = 'none'} alt={getAltTag()} />
                            <p className="visually-hidden">Click to Expand</p>
                        </button>
                    </div>
                    <div className="description-page__info">
                        <p className="description-page__plot"><span>Description: </span>{movieData?.Plot}</p>
                        {getDescriptionList()}
                    </div>
                </> :
                    <h1 className="description-page__message">{movieData}</h1>
            }
            {
                (modalExpanded && movieData && typeof movieData == "object") ?
                    <ImageModal src={movieData.Poster} closeClicked={() => { setModalExpanded(false) }} /> : ""
            }

        </div>
    </>
    );
}

export default DescriptionPage;