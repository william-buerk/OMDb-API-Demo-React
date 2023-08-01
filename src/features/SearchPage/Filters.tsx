import React, { FormEvent, useEffect } from 'react';
import './Filters.scss';

type FiltersProps = {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    defaultSearchTerm: string;
    defaultSearchType: string;
}

export default function Filters({handleSubmit, defaultSearchTerm, defaultSearchType}: FiltersProps) {

    const [searchTerm, setSearchTerm] = React.useState(defaultSearchTerm);
    const [searchType, setSearchType] = React.useState(defaultSearchType);

    useEffect(() => {
        setSearchTerm(defaultSearchTerm);
        setSearchType(defaultSearchType);
    }, [defaultSearchTerm, defaultSearchType]);

    return (
        <div className='filters'>
            <form className='filters__form' onSubmit={handleSubmit}>
                <input className='filters__search' name='searchTerm' type='text' placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                <select className='filters__dropdown' name="searchType" value={searchType} onChange={event => setSearchType(event.target.value)}>
                    <option value="">Select type</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
                <button className='filters__submit' type='submit'></button>
            </form>
        </div>
    );
}