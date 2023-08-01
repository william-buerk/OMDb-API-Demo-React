import { number } from "prop-types";
import "./PagePicker.scss";

import type {MoviesData} from './types/index.tsx';

export type PagePickerProps = {
    moviesData: string | MoviesData;
    currentPage: string | number;
    handleChange: (pageNumber: string) => void;
    handlePrev: () => void;
    handleNext: () => void;
}

export default function PagePicker({moviesData, currentPage, handleChange, handlePrev, handleNext}: PagePickerProps) {

    const getPageOptions = () => {

        if (typeof moviesData === "string" || !moviesData.totalResults) {
            return;
        }

        const totalResults: number = Number(moviesData.totalResults);

        const numPages = Math.ceil(totalResults / 10);

        const options = [];

        for ( let i = 1; i <= numPages; i++ ) {
            if (i === Number(currentPage)) {
                options.push(<option value={i} key={i} selected>{i}</option>);
            } else {
                options.push(<option value={i} key={i}>{i}</option>);
            }
        }

        return options;
    }

    const prevDisabled = () => {

        const pageNumber = currentPage === "" ? 1 : Number(currentPage);

        if (pageNumber <= 1) {
            return true;
        }

        return false;
    }

    const nextDisabled = () => {

        if (typeof moviesData === "string" || !moviesData.totalResults) {
            return;
        }

        const totalResults: number = Number(moviesData.totalResults);
        const numPages = Math.ceil(totalResults / 10);
        
        const pageNumber = currentPage === "" ? 1 : Number(currentPage);

        if (pageNumber >= numPages) {
            return true;
        }

        return false;
    }

    return (
        <div className='page-picker'>
            <button className='page-picker__button page-picker__button--prev' onClick={handlePrev} disabled={prevDisabled()}>Prev</button>
            <select onChange={(event) => {handleChange(event.target.value)}}>
                {getPageOptions()}
            </select>
            <button className='page-picker__button page-picker__button--next' onClick={handleNext} disabled={nextDisabled()}>Next</button>
        </div>
    );
}