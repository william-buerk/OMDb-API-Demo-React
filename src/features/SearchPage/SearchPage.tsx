// import React, { FormEvent, useEffect, useState, StrictMode } from 'react';
import { FormEvent, useEffect, useState } from 'react';
import Movies from "./Movies.tsx";
import Filters from "./Filters.tsx";
import PagePicker from './PagePicker.tsx';
import Header from "../../shared/components/Header.tsx";

import './SearchPage.scss';

import { useSearchParams } from 'react-router-dom';
// import NowPlaying from '../../shared/components/NowPlaying.tsx';

// import type { MoviesData, Movie } from './types/index.tsx';
import type { MoviesData } from './types/index.tsx';
// import { func } from 'prop-types';
// import { clamp } from '../../utils/utils.tsx';

const API_KEY = "c92d6020"; // Fix

export default function SearchPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesData, setMoviesData] = useState<string | MoviesData>("");


  const getDefaultValue = (param: string) => {

    const defaultValue = searchParams.get(param);

    if (defaultValue) {
      return defaultValue;
    }

    return "";
  }

  const [defaultSearchTerm, setDefaultSearchTerm] = useState(getDefaultValue("searchTerm"));
  const [defaultSearchType, setDefaultSearchType] = useState(getDefaultValue("searchType"));
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [searchType, setSearchType] = useState(defaultSearchType);
  const [page, setPage] = useState(getDefaultValue("page"));

  useEffect(() => {

    const term = getDefaultValue("searchTerm");
    const type = getDefaultValue("searchType");
    const page = getDefaultValue("page");

    setDefaultSearchTerm(term);
    setDefaultSearchType(type);

    setSearchTerm(term);
    setSearchType(type);
    setPage(page);

  }, [searchParams]);

  useEffect(() => {

    const getMoviesData = async () => {
      setMoviesData("Loading...");

      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&type=${searchType}&page=${page}&apikey=${API_KEY}`);
      const moviesJson: MoviesData = await response.json();

      setMoviesData(moviesJson);
    }

    getMoviesData();
  }, [searchTerm, searchType, page]);

  const handleFiltersSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const elements: any = form.elements; // TODO: See if there's another fix without using any 

    const search = (elements.searchTerm as HTMLInputElement).value;
    const type = (elements.searchType as HTMLSelectElement).value;

    console.log("search: ", search);
    console.log("type: ", type);

    //Updates Query string
    setSearchParams({
      "searchTerm": search,
      "searchType": type
    });

    setPage("");
  };

  function handleNewPage(pageNumber: string) {
    setPage(pageNumber);

    setSearchParams({
      "searchTerm": searchTerm,
      "searchType": searchType,
      "page": pageNumber
    });
  }

  function handlePrevPage() {

    const currentPageNumber = page === "" ? 1 : Number(page);

    const pageNumber = String(Math.max(currentPageNumber - 1, 1));

    setPage(pageNumber);

    setSearchParams({
      "searchTerm": searchTerm,
      "searchType": searchType,
      "page": pageNumber
    });
  }

  function handleNextPage() {

    if (typeof moviesData === "string" || !moviesData.totalResults) {
      return;
    }

    const totalResults: number = Number(moviesData.totalResults);
    const numPages = Math.ceil(totalResults / 10);

    const currentPageNumber = page === "" ? 1 : Number(page);

    const pageNumber = String(Math.min(currentPageNumber + 1, numPages));

    setPage(pageNumber);

    setSearchParams({
      "searchTerm": searchTerm,
      "searchType": searchType,
      "page": pageNumber
    });
  }

  function renderPagePicker() {
    return (moviesData === "Loading..." && searchTerm !== "") || (typeof moviesData !== "string" && moviesData.Response !== "False");
  }

  return (
    <>
      <Header />
      <div className="search-page">

        <div className="search-page__header">
          <h1 className="search-page__title">Search Movies</h1>

          {/* Component breaks with strictmode due to third party library*/}
          <Filters handleSubmit={handleFiltersSubmit} defaultSearchTerm={defaultSearchTerm} defaultSearchType={defaultSearchType} />

        </div>

        {renderPagePicker() ? <PagePicker moviesData={moviesData} currentPage={page} handleChange={handleNewPage} handlePrev={handlePrevPage} handleNext={handleNextPage} /> : ""}

        <Movies searchTerm={searchTerm} searchType={searchType} moviesData={moviesData} />

        {renderPagePicker() ? <PagePicker moviesData={moviesData} currentPage={page} handleChange={handleNewPage} handlePrev={handlePrevPage} handleNext={handleNextPage} /> : ""}

        {/* <NowPlaying />  */}
      </div>
    </>
  );
}